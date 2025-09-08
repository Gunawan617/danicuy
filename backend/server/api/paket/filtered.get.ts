import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { profesi, jenjang } = query

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    let sql = 'SELECT * FROM paket WHERE 1=1'
    const params = []

    if (profesi) {
      sql += ' AND profesi = ?'
      params.push(profesi)
    }

    if (jenjang) {
      sql += ' AND jenjang = ?'
      params.push(jenjang)
    }

    sql += ' ORDER BY durasi_bulan'

    const [rows] = await connection.execute(sql, params)

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
