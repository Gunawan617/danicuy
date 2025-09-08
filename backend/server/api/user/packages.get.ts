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
      SELECT o.*, p.nama, p.profesi, p.jenjang, p.durasi_bulan, p.fitur
      FROM orders o
      JOIN paket p ON o.paket_id = p.id
      WHERE o.user_id = ? AND o.status = 'verified' AND o.end_date >= CURDATE()
      ORDER BY o.end_date DESC
    `, [user_id])

    return {
      success: true,
      data: rows
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user packages'
    })
  } finally {
    await connection.end()
  }
})
