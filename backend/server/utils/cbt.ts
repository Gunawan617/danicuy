import mysql from 'mysql2/promise'

export const getRandomQuestions = async (profesi: string, jenjang: string, limit: number = 50) => {
  const connection = await dbConnect()

  try {
    // Get categories for profesi and jenjang
    const [categories] = await connection.execute(
      'SELECT id, bobot FROM kategori WHERE profesi = ? AND jenjang = ?',
      [profesi, jenjang]
    )

    const questions = []

    // Distribute questions across categories
    for (const category of categories) {
      const categoryLimit = Math.floor(limit * category.bobot / categories.length)
      if (categoryLimit > 0) {
        const [categoryQuestions] = await connection.execute(
          'SELECT * FROM soal WHERE kategori_id = ? ORDER BY RAND() LIMIT ?',
          [category.id, categoryLimit]
        )
        questions.push(...categoryQuestions)
      }
    }

    // If we don't have enough questions, fill with random ones
    if (questions.length < limit) {
      const remaining = limit - questions.length
      const [randomQuestions] = await connection.execute(
        'SELECT * FROM soal WHERE profesi = ? AND jenjang = ? ORDER BY RAND() LIMIT ?',
        [profesi, jenjang, remaining]
      )
      questions.push(...randomQuestions)
    }

    return questions.slice(0, limit)
  } finally {
    await connection.end()
  }
}

export const calculateScore = (answers: any[], questions: any[]) => {
  let correct = 0
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.question_id)
    if (question && question.jawaban_benar === answer.jawaban_user) {
      correct++
    }
  })
  return (correct / questions.length) * 100
}
