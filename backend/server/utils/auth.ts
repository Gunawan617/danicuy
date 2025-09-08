import mysql from 'mysql2/promise'

export const dbConnect = async () => {
  const config = useRuntimeConfig()

  return await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })
}

export const hashPassword = async (password: string) => {
  const bcrypt = await import('bcrypt')
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (password: string, hash: string) => {
  const bcrypt = await import('bcrypt')
  return await bcrypt.compare(password, hash)
}

export const generateToken = (payload: any) => {
  const config = useRuntimeConfig()
  const jwt = require('jsonwebtoken')
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
  const config = useRuntimeConfig()
  const jwt = require('jsonwebtoken')
  return jwt.verify(token, config.jwtSecret)
}
