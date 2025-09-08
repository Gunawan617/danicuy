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
      'SELECT * FROM paket WHERE 1 ORDER BY profesi, jenjang, durasi_bulan'
    )

    return {
      success: true,
      data: rows
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch packages'
    })
  } finally {
    await connection.end()
  }
})
