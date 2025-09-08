import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nama, email, password, profesi, jenjang } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Insert user
    const [result] = await connection.execute(
      'INSERT INTO users (nama, email, password_hash, profesi, jenjang) VALUES (?, ?, ?, ?, ?)',
      [nama, email, hashedPassword, profesi, jenjang]
    )

    // Generate JWT
    const token = jwt.sign(
      { id: result.insertId, email, profesi, jenjang },
      config.jwtSecret,
      { expiresIn: '7d' }
    )

    return {
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: result.insertId, nama, email, profesi, jenjang }
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email already exists'
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Registration failed'
    })
  } finally {
    await connection.end()
  }
})
