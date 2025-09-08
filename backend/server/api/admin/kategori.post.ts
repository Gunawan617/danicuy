import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nama, profesi, jenjang, bobot } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    const [result] = await connection.execute(
      'INSERT INTO kategori (nama, profesi, jenjang, bobot) VALUES (?, ?, ?, ?)',
      [nama, profesi, jenjang, bobot]
    )

    return {
      success: true,
      message: 'Category added successfully',
      category_id: result.insertId
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add category'
    })
  } finally {
    await connection.end()
  }
})
