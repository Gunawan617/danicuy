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
    // Test connection
    await connection.execute('SELECT 1')
    return { status: 'Database connected successfully' }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed'
    })
  } finally {
    await connection.end()
  }
})
