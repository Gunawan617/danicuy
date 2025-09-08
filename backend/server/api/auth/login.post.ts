import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    // Get user
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const user = rows[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, profesi: user.profesi, jenjang: user.jenjang },
      config.jwtSecret,
      { expiresIn: '7d' }
    )

    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        profesi: user.profesi,
        jenjang: user.jenjang
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed'
    })
  } finally {
    await connection.end()
  }
})
