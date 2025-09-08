import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { user_id, paket_id, soal_ids } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    // Start exam session
    const startTime = new Date()
    const [sessionResult] = await connection.execute(
      'INSERT INTO exam_session (user_id, paket_id, start_time) VALUES (?, ?, ?)',
      [user_id, paket_id, startTime]
    )

    const sessionId = sessionResult.insertId

    // Insert questions into session
    for (const soalId of soal_ids) {
      await connection.execute(
        'INSERT INTO exam_session_questions (session_id, soal_id) VALUES (?, ?)',
        [sessionId, soalId]
      )
    }

    return {
      success: true,
      session_id: sessionId,
      message: 'Exam session started'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to start exam session'
    })
  } finally {
    await connection.end()
  }
})
