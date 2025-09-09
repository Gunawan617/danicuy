import { beforeAll, afterAll } from 'vitest'
import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'

let testConnection

beforeAll(async () => {
  try {
    // Create connection to MySQL server (without specifying database)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password'
    })

    // Create test database
    await connection.execute('CREATE DATABASE IF NOT EXISTS cbt_ukom_test')
    await connection.execute('USE cbt_ukom_test')

    // Read and execute migration file
    const migrationPath = path.join(process.cwd(), 'database', 'migrations', '001_create_tables.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    // Split SQL commands and execute them
    const commands = migrationSQL.split(';').filter(cmd => cmd.trim().length > 0)

    for (const command of commands) {
      if (command.trim()) {
        await connection.execute(command)
      }
    }

    // Read and execute seed file
    const seedPath = path.join(process.cwd(), 'database', 'seeds', '001_seed_data.sql')
    const seedSQL = fs.readFileSync(seedPath, 'utf8')
    const seedCommands = seedSQL.split(';').filter(cmd => cmd.trim().length > 0)

    for (const command of seedCommands) {
      if (command.trim()) {
        try {
          await connection.execute(command)
        } catch (error) {
          // Ignore duplicate key errors in seed data
          if (!error.message.includes('Duplicate entry')) {
            throw error
          }
        }
      }
    }

    testConnection = connection

    console.log('✅ Test database setup completed')
  } catch (error) {
    console.error('❌ Failed to setup test database:', error)
    throw error
  }
})

afterAll(async () => {
  if (testConnection) {
    try {
      // Clean up test database
      await testConnection.execute('DROP DATABASE IF EXISTS cbt_ukom_test')
      await testConnection.end()
      console.log('✅ Test database cleanup completed')
    } catch (error) {
      console.error('❌ Failed to cleanup test database:', error)
    }
  }
})

