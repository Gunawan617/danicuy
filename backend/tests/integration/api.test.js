import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { createServer } from 'http'
import { parse } from 'url'
import supertest from 'supertest'
import mysql from 'mysql2/promise'

// Import handlers
import registerHandler from '../../server/api/auth/register.post'
import loginHandler from '../../server/api/auth/login.post'
import paketHandler from '../../server/api/paket.get'
import ordersHandler from '../../server/api/orders.post'

describe('API Integration Tests', () => {
  let testDbConnection
  let testServer
  let request

  beforeAll(async () => {
    // Create test database connection
    testDbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: 'cbt_ukom_test'
    })

    // Create test database if not exists
    await testDbConnection.execute('CREATE DATABASE IF NOT EXISTS cbt_ukom_test')
    await testDbConnection.execute('USE cbt_ukom_test')

    // Run migrations for test database
    const migrationSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        profesi ENUM('bidan', 'perawat') NOT NULL,
        jenjang ENUM('D3', 'D4-S1') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS paket (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        profesi ENUM('bidan', 'perawat') NOT NULL,
        jenjang ENUM('D3', 'D4-S1') NOT NULL,
        durasi_bulan INT NOT NULL,
        harga DECIMAL(10,2) NOT NULL,
        fitur TEXT,
        jumlah_soal INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        paket_id INT NOT NULL,
        status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
        bukti_transfer VARCHAR(255),
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (paket_id) REFERENCES paket(id)
      );
    `
    await testDbConnection.execute(migrationSQL)

    // Setup test server
    testServer = createServer(async (req, res) => {
      const { pathname } = parse(req.url, true)

      // Simple routing for test endpoints
      if (pathname === '/api/auth/register' && req.method === 'POST') {
        // Handle register
      } else if (pathname === '/api/auth/login' && req.method === 'POST') {
        // Handle login
      } else if (pathname === '/api/paket' && req.method === 'GET') {
        // Handle paket
      }
    })

    await new Promise((resolve) => {
      testServer.listen(3001, resolve)
    })

    request = supertest(testServer)
  })

  afterAll(async () => {
    if (testServer) {
      testServer.close()
    }
    if (testDbConnection) {
      await testDbConnection.execute('DROP DATABASE IF EXISTS cbt_ukom_test')
      await testDbConnection.end()
    }
  })

  beforeEach(async () => {
    // Clean up test data
    await testDbConnection.execute('TRUNCATE TABLE orders')
    await testDbConnection.execute('TRUNCATE TABLE users')
    await testDbConnection.execute('TRUNCATE TABLE paket')

    // Insert test data
    await testDbConnection.execute(`
      INSERT INTO paket (nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal) VALUES
      ('Paket CBT Bidan D3 3 Bulan', 'bidan', 'D3', 3, 150000.00, 'Test features', 100),
      ('Paket CBT Perawat D3 3 Bulan', 'perawat', 'D3', 3, 150000.00, 'Test features', 100)
    `)
  })

  describe('Authentication Flow', () => {
    it('should complete full user registration and login flow', async () => {
      const userData = {
        nama: 'Integration Test User',
        email: 'integration@test.com',
        password: 'testpassword123',
        profesi: 'bidan',
        jenjang: 'D3'
      }

      // Test registration
      const registerResponse = await request
        .post('/api/auth/register')
        .send(userData)
        .expect(200)

      expect(registerResponse.body.success).toBe(true)
      expect(registerResponse.body.user.email).toBe(userData.email)

      // Test login
      const loginResponse = await request
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200)

      expect(loginResponse.body.success).toBe(true)
      expect(loginResponse.body.token).toBeDefined()
      expect(loginResponse.body.user.email).toBe(userData.email)
    })

    it('should reject login with wrong password', async () => {
      // First register a user
      await testDbConnection.execute(`
        INSERT INTO users (nama, email, password_hash, profesi, jenjang)
        VALUES ('Test User', 'wrongpass@test.com', '$2b$10$test.hash', 'bidan', 'D3')
      `)

      const loginResponse = await request
        .post('/api/auth/login')
        .send({
          email: 'wrongpass@test.com',
          password: 'wrongpassword'
        })
        .expect(401)

      expect(loginResponse.body.success).toBe(false)
    })
  })

  describe('Package Management', () => {
    beforeEach(async () => {
      // Insert test packages
      await testDbConnection.execute(`
        INSERT INTO paket (nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal) VALUES
        ('Test Package 1', 'bidan', 'D3', 3, 150000.00, 'Test features', 100),
        ('Test Package 2', 'perawat', 'D4-S1', 6, 250000.00, 'Test features', 200)
      `)
    })

    it('should retrieve all packages', async () => {
      const response = await request
        .get('/api/paket')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBeGreaterThan(0)

      // Check package structure
      const firstPackage = response.body.data[0]
      expect(firstPackage).toHaveProperty('id')
      expect(firstPackage).toHaveProperty('nama')
      expect(firstPackage).toHaveProperty('profesi')
      expect(firstPackage).toHaveProperty('harga')
    })

    it('should filter packages by profession and level', async () => {
      const response = await request
        .get('/api/paket/filtered?profesi=bidan&jenjang=D3')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)

      // All returned packages should match the filter
      response.body.data.forEach(pkg => {
        expect(pkg.profesi).toBe('bidan')
        expect(pkg.jenjang).toBe('D3')
      })
    })
  })

  describe('Order Management', () => {
    let userId
    let paketId
    let authToken

    beforeEach(async () => {
      // Create test user
      const [userResult] = await testDbConnection.execute(`
        INSERT INTO users (nama, email, password_hash, profesi, jenjang)
        VALUES ('Order Test User', 'order@test.com', '$2b$10$test.hash', 'bidan', 'D3')
      `)
      userId = userResult.insertId

      // Create test package
      const [paketResult] = await testDbConnection.execute(`
        INSERT INTO paket (nama, profesi, jenjang, durasi_bulan, harga, fitur, jumlah_soal)
        VALUES ('Order Test Package', 'bidan', 'D3', 3, 150000.00, 'Test', 100)
      `)
      paketId = paketResult.insertId

      // Mock auth token
      authToken = 'mock_jwt_token'
    })

    it('should create order successfully', async () => {
      const orderData = {
        user_id: userId,
        paket_id: paketId,
        bukti_transfer: 'base64_test_image_data'
      }

      const response = await request
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.order_id).toBeDefined()

      // Verify order was created in database
      const [orders] = await testDbConnection.execute(
        'SELECT * FROM orders WHERE user_id = ? AND paket_id = ?',
        [userId, paketId]
      )
      expect(orders.length).toBe(1)
      expect(orders[0].status).toBe('pending')
    })

    it('should reject order for non-existent package', async () => {
      const orderData = {
        user_id: userId,
        paket_id: 99999, // Non-existent package
        bukti_transfer: 'base64_test_image_data'
      }

      const response = await request
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData)
        .expect(404)

      expect(response.body.success).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should handle malformed JSON requests', async () => {
      const response = await request
        .post('/api/auth/register')
        .set('Content-Type', 'application/json')
        .send('invalid json {')
        .expect(400)

      expect(response.body.success).toBe(false)
    })

    it('should handle missing required fields', async () => {
      const incompleteData = {
        nama: 'Test User',
        // Missing email and other required fields
      }

      const response = await request
        .post('/api/auth/register')
        .send(incompleteData)
        .expect(400)

      expect(response.body.success).toBe(false)
    })
  })
})
