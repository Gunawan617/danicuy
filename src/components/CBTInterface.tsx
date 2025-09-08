'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: number
  soal: string
  pilihan_a: string
  pilihan_b: string
  pilihan_c: string
  pilihan_d: string
  jawaban_benar: string
}

export default function CBTInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: string}>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [examStarted, setExamStarted] = useState(false)
  const [sessionId, setSessionId] = useState<number | null>(null)

  useEffect(() => {
    if (examStarted && questions.length === 0) {
      fetchQuestions()
    }
  }, [examStarted])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (examStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [examStarted, timeLeft])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/soal/random?limit=50')
      const data = await response.json()
      if (data.success) {
        setQuestions(data.data)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const startExam = async () => {
    try {
      setLoading(true)
      // Get questions first
      const questionResponse = await fetch('http://localhost:3000/api/soal/random?limit=50')
      const questionData = await questionResponse.json()

      if (questionData.success) {
        setQuestions(questionData.data)

        // Start exam session
        const soalIds = questionData.data.map((q: Question) => q.id)
        const sessionResponse = await fetch('http://localhost:3000/api/exam/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 1, // This should come from authentication
            paket_id: 1, // This should come from selected package
            soal_ids: soalIds
          })
        })

        const sessionData = await sessionResponse.json()
        if (sessionData.success) {
          setSessionId(sessionData.session_id)
          setExamStarted(true)
        }
      }
    } catch (error) {
      console.error('Error starting exam:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (loading && !examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat ujian...</p>
        </div>
      </div>
    )
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">CBT UKOM</h1>
          <p className="text-gray-600 text-center mb-8">
            Anda akan memulai ujian CBT UKOM. Pastikan koneksi internet stabil dan lingkungan tenang.
          </p>
          <button
            onClick={startExam}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-medium"
          >
            Mulai Ujian
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">CBT UKOM</h1>
              <span className="text-sm text-gray-500">Soal {currentQuestion + 1} dari {questions.length}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-lg font-mono text-red-600">
                {formatTime(timeLeft)}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Submit Ujian
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-4">Navigasi Soal</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, i) => (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestion(i)}
                    className={`w-10 h-10 rounded-md text-sm font-medium ${
                      currentQuestion === i
                        ? 'bg-blue-600 text-white'
                        : answers[question.id]
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {questions[currentQuestion]?.soal}
                </h2>
              </div>

              <div className="space-y-4">
                {questions[currentQuestion] && (
                  <>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value="a"
                        checked={answers[questions[currentQuestion].id] === 'a'}
                        onChange={() => handleAnswer(questions[currentQuestion].id, 'a')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        <strong className="uppercase mr-2">A.</strong>
                        {questions[currentQuestion].pilihan_a}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value="b"
                        checked={answers[questions[currentQuestion].id] === 'b'}
                        onChange={() => handleAnswer(questions[currentQuestion].id, 'b')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        <strong className="uppercase mr-2">B.</strong>
                        {questions[currentQuestion].pilihan_b}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value="c"
                        checked={answers[questions[currentQuestion].id] === 'c'}
                        onChange={() => handleAnswer(questions[currentQuestion].id, 'c')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        <strong className="uppercase mr-2">C.</strong>
                        {questions[currentQuestion].pilihan_c}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value="d"
                        checked={answers[questions[currentQuestion].id] === 'd'}
                        onChange={() => handleAnswer(questions[currentQuestion].id, 'd')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        <strong className="uppercase mr-2">D.</strong>
                        {questions[currentQuestion].pilihan_d}
                      </span>
                    </label>
                  </>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
