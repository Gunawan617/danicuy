import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal } = body

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
      'INSERT INTO paket (nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal]
    )

    return {
      success: true,
      message: 'Package added successfully',
      package_id: result.insertId
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add package'
    })
  } finally {
    await connection.end()
  }
})
