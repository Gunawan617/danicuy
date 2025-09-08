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
    // Get user stats
    const [userStats] = await connection.execute(
      'SELECT COUNT(*) as total_users FROM users'
    )

    // Get active sessions
    const [activeSessions] = await connection.execute(
      'SELECT COUNT(*) as active_sessions FROM exam_session WHERE status = ?',
      ['ongoing']
    )

    // Get completed exams
    const [completedExams] = await connection.execute(
      'SELECT COUNT(*) as completed_exams FROM exam_session WHERE status = ?',
      ['completed']
    )

    // Get popular packages
    const [popularPackages] = await connection.execute(`
      SELECT p.nama, COUNT(o.id) as order_count
      FROM paket p
      LEFT JOIN orders o ON p.id = o.paket_id
      GROUP BY p.id
      ORDER BY order_count DESC
      LIMIT 5
    `)

    return {
      success: true,
      stats: {
        total_users: userStats[0].total_users,
        active_sessions: activeSessions[0].active_sessions,
        completed_exams: completedExams[0].completed_exams,
        popular_packages: popularPackages
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch admin stats'
    })
  } finally {
    await connection.end()
  }
})
