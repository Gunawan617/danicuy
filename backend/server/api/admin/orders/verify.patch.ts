import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { order_id, status } = query

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    // Update order status
    await connection.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, order_id]
    )

    // If verified, set start and end dates
    if (status === 'verified') {
      const [orderRows] = await connection.execute(
        'SELECT o.*, p.durasi_bulan FROM orders o JOIN paket p ON o.paket_id = p.id WHERE o.id = ?',
        [order_id]
      )

      if (orderRows.length > 0) {
        const order = orderRows[0]
        const startDate = new Date()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + order.durasi_bulan)

        await connection.execute(
          'UPDATE orders SET start_date = ?, end_date = ? WHERE id = ?',
          [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0], order_id]
        )
      }
    }

    return {
      success: true,
      message: `Order ${status} successfully`
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update order status'
    })
  } finally {
    await connection.end()
  }
})
