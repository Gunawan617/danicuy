import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { user_id } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    const [rows] = await connection.execute(`
      SELECT es.*, p.nama as paket_nama
      FROM exam_session es
      JOIN paket p ON es.paket_id = p.id
      WHERE es.user_id = ?
      ORDER BY es.start_time DESC
    `, [user_id])

    return {
      success: true,
      data: rows
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch exam history'
    })
  } finally {
    await connection.end()
  }
})
