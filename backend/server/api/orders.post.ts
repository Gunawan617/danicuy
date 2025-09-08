import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { user_id, paket_id, bukti_transfer } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    // Get paket details
    const [paketRows] = await connection.execute(
      'SELECT * FROM paket WHERE id = ?',
      [paket_id]
    )

    if (paketRows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Package not found'
      })
    }

    const paket = paketRows[0]

    // Calculate start and end dates
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + paket.durasi_bulan)

    // Insert order
    const [result] = await connection.execute(
      'INSERT INTO orders (user_id, paket_id, bukti_transfer, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
      [user_id, paket_id, bukti_transfer, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
    )

    return {
      success: true,
      message: 'Order created successfully',
      order_id: result.insertId
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create order'
    })
  } finally {
    await connection.end()
  }
})
