import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import mysql from 'mysql2/promise'

// Mock dependencies
vi.mock('mysql2/promise')

// Mock Nuxt runtime config
const mockRuntimeConfig = {
  db: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'cbt_ukom'
  }
}

vi.mock('#config', () => ({
  useRuntimeConfig: () => mockRuntimeConfig
}))

describe('Questions API Tests', () => {
  let mockConnection
  let mockEvent

  beforeEach(() => {
    mockConnection = {
      execute: vi.fn(),
      end: vi.fn()
    }
    mockEvent = {
      req: {},
      res: {},
      context: {
        params: {}
      }
    }

    mysql.createConnection.mockResolvedValue(mockConnection)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/soal/random', () => {
    it('should return random questions successfully', async () => {
      const mockQuestions = [
        {
          id: 1,
          soal: 'Pertanyaan 1',
          pilihan_a: 'A',
          pilihan_b: 'B',
          pilihan_c: 'C',
          pilihan_d: 'D',
          jawaban_benar: 'a'
        },
        {
          id: 2,
          soal: 'Pertanyaan 2',
          pilihan_a: 'A',
          pilihan_b: 'B',
          pilihan_c: 'C',
          pilihan_d: 'D',
          jawaban_benar: 'b'
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockQuestions])

      const { default: randomQuestionsHandler } = await import('../../server/api/soal/random.get')

      // Mock query parameters
      mockEvent.req.query = { limit: '50' }

      const result = await randomQuestionsHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        data: mockQuestions
      })

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT * FROM soal ORDER BY RAND() LIMIT ?',
        [50]
      )
    })

    it('should use default limit when not specified', async () => {
      const mockQuestions = [
        {
          id: 1,
          soal: 'Pertanyaan 1',
          pilihan_a: 'A',
          pilihan_b: 'B',
          pilihan_c: 'C',
          pilihan_d: 'D',
          jawaban_benar: 'a'
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockQuestions])

      const { default: randomQuestionsHandler } = await import('../../server/api/soal/random.get')

      // No query parameters
      mockEvent.req.query = {}

      await randomQuestionsHandler(mockEvent)

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT * FROM soal ORDER BY RAND() LIMIT ?',
        [100] // default limit
      )
    })
  })

  describe('GET /api/paket', () => {
    it('should return all packages successfully', async () => {
      const mockPackages = [
        {
          id: 1,
          nama: 'Paket CBT Bidan D3 3 Bulan',
          profesi: 'bidan',
          jenjang: 'D3',
          durasi_bulan: 3,
          harga: 150000.00,
          fitur: 'Review pembahasan, Timer CBT, Autosave',
          jumlah_soal: 100
        },
        {
          id: 2,
          nama: 'Paket CBT Perawat D3 3 Bulan',
          profesi: 'perawat',
          jenjang: 'D3',
          durasi_bulan: 3,
          harga: 150000.00,
          fitur: 'Review pembahasan, Timer CBT, Autosave',
          jumlah_soal: 100
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockPackages])

      const { default: paketHandler } = await import('../../server/api/paket.get')

      const result = await paketHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        data: mockPackages
      })

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT * FROM paket WHERE 1 ORDER BY profesi, jenjang, durasi_bulan',
        []
      )
    })
  })

  describe('GET /api/paket/filtered', () => {
    it('should return filtered packages successfully', async () => {
      const mockPackages = [
        {
          id: 1,
          nama: 'Paket CBT Bidan D3 3 Bulan',
          profesi: 'bidan',
          jenjang: 'D3',
          durasi_bulan: 3,
          harga: 150000.00
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockPackages])

      const { default: filteredPaketHandler } = await import('../../server/api/paket/filtered.get')

      // Mock query parameters
      mockEvent.req.query = { profesi: 'bidan', jenjang: 'D3' }

      const result = await filteredPaketHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        data: mockPackages
      })

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT * FROM paket WHERE profesi = ? AND jenjang = ? ORDER BY durasi_bulan',
        ['bidan', 'D3']
      )
    })

    it('should return all packages when no filters specified', async () => {
      const mockPackages = [
        {
          id: 1,
          nama: 'Paket CBT Bidan D3 3 Bulan',
          profesi: 'bidan',
          jenjang: 'D3',
          durasi_bulan: 3,
          harga: 150000.00
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockPackages])

      const { default: filteredPaketHandler } = await import('../../server/api/paket/filtered.get')

      // No query parameters
      mockEvent.req.query = {}

      const result = await filteredPaketHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        data: mockPackages
      })

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT * FROM paket ORDER BY profesi, jenjang, durasi_bulan',
        []
      )
    })
  })

  describe('GET /api/admin/soal', () => {
    it('should return all questions with categories for admin', async () => {
      const mockQuestions = [
        {
          id: 1,
          kategori_id: 1,
          profesi: 'bidan',
          jenjang: 'D3',
          soal: 'Pertanyaan 1',
          pilihan_a: 'A',
          pilihan_b: 'B',
          pilihan_c: 'C',
          pilihan_d: 'D',
          jawaban_benar: 'a',
          pembahasan: 'Pembahasan jawaban',
          kategori: {
            nama: 'Dasar Kebidanan'
          }
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockQuestions])

      const { default: adminSoalHandler } = await import('../../server/api/admin/soal.get')

      const result = await adminSoalHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        data: mockQuestions
      })
    })
  })

  describe('POST /api/admin/soal', () => {
    it('should create new question successfully', async () => {
      const questionData = {
        kategori_id: 1,
        profesi: 'bidan',
        jenjang: 'D3',
        soal: 'Pertanyaan baru',
        pilihan_a: 'Jawaban A',
        pilihan_b: 'Jawaban B',
        pilihan_c: 'Jawaban C',
        pilihan_d: 'Jawaban D',
        jawaban_benar: 'a',
        pembahasan: 'Penjelasan jawaban'
      }

      mockConnection.execute.mockResolvedValueOnce([{ insertId: 123 }])

      const { default: createSoalHandler } = await import('../../server/api/admin/soal.post')

      global.readBody = vi.fn().mockResolvedValue(questionData)

      const result = await createSoalHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        message: 'Question created successfully',
        question_id: 123
      })
    })

    it('should validate required fields', async () => {
      const invalidData = {
        kategori_id: 1,
        profesi: 'bidan',
        // missing jenjang
        soal: 'Pertanyaan baru',
        pilihan_a: 'Jawaban A',
        pilihan_b: 'Jawaban B',
        pilihan_c: 'Jawaban C',
        pilihan_d: 'Jawaban D',
        jawaban_benar: 'a',
        pembahasan: 'Penjelasan jawaban'
      }

      const { default: createSoalHandler } = await import('../../server/api/admin/soal.post')

      global.readBody = vi.fn().mockResolvedValue(invalidData)

      await expect(createSoalHandler(mockEvent)).rejects.toThrow()
    })
  })
})
