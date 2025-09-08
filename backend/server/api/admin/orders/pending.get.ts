import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC',
      ['pending']
    )

    return {
      success: true,
      data: rows
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch pending orders'
    })
  } finally {
    await connection.end()
  }
})
