import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { kategori_id, limit = 50 } = query

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    let sql = 'SELECT * FROM soal WHERE 1=1'
    const params = []

    if (kategori_id) {
      sql += ' AND kategori_id = ?'
      params.push(kategori_id)
    }

    sql += ' ORDER BY RAND() LIMIT ?'
    params.push(parseInt(limit))

    const [rows] = await connection.execute(sql, params)

    return {
      success: true,
      data: rows
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch questions'
    })
  } finally {
    await connection.end()
  }
})
