import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { session_id, answers } = body

  const config = useRuntimeConfig()

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  try {
    let correctCount = 0
    const totalQuestions = answers.length

    // Update answers and calculate score
    for (const answer of answers) {
      const { question_id, jawaban_user } = answer

      // Get correct answer
      const [questionRows] = await connection.execute(
        'SELECT jawaban_benar FROM soal WHERE id = ?',
        [question_id]
      )

      if (questionRows.length > 0) {
        const correctAnswer = questionRows[0].jawaban_benar
        const isCorrect = jawaban_user === correctAnswer

        if (isCorrect) correctCount++

        // Update session question
        await connection.execute(
          'UPDATE exam_session_questions SET jawaban_user = ?, is_correct = ? WHERE session_id = ? AND soal_id = ?',
          [jawaban_user, isCorrect, session_id, question_id]
        )
      }
    }

    // Calculate score
    const score = (correctCount / totalQuestions) * 100

    // Update session
    const endTime = new Date()
    await connection.execute(
      'UPDATE exam_session SET end_time = ?, score = ?, status = ? WHERE id = ?',
      [endTime, score, 'completed', session_id]
    )

    return {
      success: true,
      score: score.toFixed(2),
      correct_answers: correctCount,
      total_questions: totalQuestions
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit exam'
    })
  } finally {
    await connection.end()
  }
})
