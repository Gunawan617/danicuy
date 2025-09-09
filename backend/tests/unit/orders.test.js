import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import mysql from 'mysql2/promise'

// Mock all dependencies
vi.mock('mysql2/promise')
vi.mock('h3')
vi.mock('#config')

// Setup global mocks
global.defineEventHandler = vi.fn()
global.readBody = vi.fn()
global.createError = vi.fn()
global.useRuntimeConfig = vi.fn(() => ({
  db: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'cbt_ukom'
  }
}))

// Test utility functions
const mockDatabaseResponse = (response) => {
  mysql.createConnection.mockResolvedValue({
    execute: vi.fn().mockResolvedValue(response),
    end: vi.fn()
  })
}

describe('Orders API Tests', () => {
  let mockConnection
  let mockEvent

  beforeEach(() => {
    mockConnection = {
      execute: vi.fn(),
      end: vi.fn()
    }
    mockEvent = {
      req: {},
      res: {}
    }

    mysql.createConnection.mockResolvedValue(mockConnection)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/orders', () => {
    it('should create order successfully', async () => {
      const orderData = {
        user_id: 1,
        paket_id: 1,
        bukti_transfer: 'base64_image_data'
      }

      const mockPaket = {
        id: 1,
        nama: 'Paket CBT Bidan D3 3 Bulan',
        durasi_bulan: 3
      }

      // Mock database responses
      mockConnection.execute
        .mockResolvedValueOnce([[mockPaket]]) // Get paket details
        .mockResolvedValueOnce([{ insertId: 123 }]) // Insert order

      const { default: ordersHandler } = await import('../../server/api/orders.post')

      global.readBody = vi.fn().mockResolvedValue(orderData)

      const result = await ordersHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        message: 'Order created successfully',
        order_id: 123
      })

      expect(mockConnection.execute).toHaveBeenCalledTimes(2)
    })

    it('should return error for non-existent package', async () => {
      const orderData = {
        user_id: 1,
        paket_id: 999,
        bukti_transfer: 'base64_image_data'
      }

      // Mock empty result (package not found)
      mockConnection.execute.mockResolvedValueOnce([[]])

      const { default: ordersHandler } = await import('../../server/api/orders.post')

      global.readBody = vi.fn().mockResolvedValue(orderData)

      await expect(ordersHandler(mockEvent)).rejects.toThrow('Package not found')
    })

    it('should calculate correct end date', async () => {
      const orderData = {
        user_id: 1,
        paket_id: 1,
        bukti_transfer: 'base64_image_data'
      }

      const mockPaket = {
        id: 1,
        nama: 'Paket CBT Bidan D3 6 Bulan',
        durasi_bulan: 6
      }

      mockConnection.execute
        .mockResolvedValueOnce([[mockPaket]])
        .mockResolvedValueOnce([{ insertId: 124 }])

      const { default: ordersHandler } = await import('../../server/api/orders.post')

      global.readBody = vi.fn().mockResolvedValue(orderData)

      const startDate = new Date()
      const expectedEndDate = new Date()
      expectedEndDate.setMonth(expectedEndDate.getMonth() + 6)

      await ordersHandler(mockEvent)

      // Verify the insert query includes correct dates
      const insertCall = mockConnection.execute.mock.calls[1]
      expect(insertCall[0]).toContain('INSERT INTO orders')
      expect(insertCall[1]).toContain(startDate.toISOString().split('T')[0])
    })

    it('should handle database errors', async () => {
      const orderData = {
        user_id: 1,
        paket_id: 1,
        bukti_transfer: 'base64_image_data'
      }

      // Mock database error
      mockConnection.execute.mockRejectedValue(new Error('Database connection failed'))

      const { default: ordersHandler } = await import('../../server/api/orders.post')

      global.readBody = vi.fn().mockResolvedValue(orderData)

      await expect(ordersHandler(mockEvent)).rejects.toThrow('Failed to create order')
    })
  })

  describe('GET /api/admin/orders/pending', () => {
    it('should return pending orders successfully', async () => {
      const mockOrders = [
        {
          id: 1,
          user_id: 1,
          paket_id: 1,
          status: 'pending',
          bukti_transfer: 'image1.jpg',
          created_at: '2024-01-01T00:00:00.000Z',
          user: { nama: 'John Doe', email: 'john@example.com' },
          paket: { nama: 'Paket CBT Bidan D3 3 Bulan' }
        }
      ]

      mockConnection.execute.mockResolvedValueOnce([mockOrders])

      const { default: pendingOrdersHandler } = await import('../../server/api/admin/orders/pending.get')

      const result = await pendingOrdersHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        data: mockOrders
      })
    })
  })

  describe('PATCH /api/admin/orders/verify', () => {
    it('should verify order successfully', async () => {
      const verifyData = {
        order_id: 1,
        status: 'verified'
      }

      mockConnection.execute.mockResolvedValueOnce([{ affectedRows: 1 }])

      const { default: verifyOrderHandler } = await import('../../server/api/admin/orders/verify.patch')

      global.readBody = vi.fn().mockResolvedValue(verifyData)

      const result = await verifyOrderHandler(mockEvent)

      expect(result).toEqual({
        success: true,
        message: 'Order status updated successfully'
      })
    })

    it('should return error when order not found', async () => {
      const verifyData = {
        order_id: 999,
        status: 'verified'
      }

      mockConnection.execute.mockResolvedValueOnce([{ affectedRows: 0 }])

      const { default: verifyOrderHandler } = await import('../../server/api/admin/orders/verify.patch')

      global.readBody = vi.fn().mockResolvedValue(verifyData)

      await expect(verifyOrderHandler(mockEvent)).rejects.toThrow('Order not found')
    })
  })
})
