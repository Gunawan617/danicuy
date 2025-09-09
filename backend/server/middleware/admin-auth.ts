import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const token = authHeader.substring(7)
  const config = useRuntimeConfig()

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    event.context.user = decoded

    // For now, allow all authenticated users to access admin
    // In production, check for admin role in database
    // TODO: Add role-based access control

  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
})
