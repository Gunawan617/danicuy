import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { session_id } = query

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    // Get session details
    const [sessionRows] = await connection.execute(
      'SELECT * FROM exam_session WHERE id = ?',
      [session_id]
    )

    if (sessionRows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Session not found'
      })
    }

    const session = sessionRows[0]

    // Get questions with answers and explanations
    const [questionRows] = await connection.execute(`
      SELECT 
        esq.soal_id,
        s.pertanyaan,
        s.opsi_a,
        s.opsi_b,
        s.opsi_c,
        s.opsi_d,
        s.jawaban_benar,
        s.pembahasan,
        esq.jawaban_user,
        esq.is_correct
      FROM exam_session_questions esq
      JOIN soal s ON esq.soal_id = s.id
      WHERE esq.session_id = ?
      ORDER BY esq.id
    `, [session_id])

    return {
      success: true,
      session: {
        id: session.id,
        score: session.score,
        start_time: session.start_time,
        end_time: session.end_time,
        status: session.status
      },
      questions: questionRows
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch review'
    })
  } finally {
    await connection.end()
  }
})
