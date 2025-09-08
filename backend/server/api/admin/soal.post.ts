import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { kategori_id, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, jawaban_benar, pembahasan, profesi, jenjang } = body

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
      'INSERT INTO soal (kategori_id, profesi, jenjang, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, jawaban_benar, pembahasan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [kategori_id, profesi, jenjang, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, jawaban_benar, pembahasan]
    )

    return {
      success: true,
      message: 'Question added successfully',
      question_id: result.insertId
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add question'
    })
  } finally {
    await connection.end()
  }
})
