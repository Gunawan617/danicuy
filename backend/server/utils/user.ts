import { dbConnect } from './auth'

export const getUserActivePackages = async (userId: number) => {
  const connection = await dbConnect()

  try {
    const [rows] = await connection.execute(`
      SELECT o.*, p.nama, p.profesi, p.jenjang, p.durasi_bulan, p.fitur
      FROM orders o
      JOIN paket p ON o.paket_id = p.id
      WHERE o.user_id = ? AND o.status = 'verified' AND o.end_date >= CURDATE()
      ORDER BY o.end_date DESC
    `, [userId])

    return rows
  } finally {
    await connection.end()
  }
}

export const getUserExamHistory = async (userId: number) => {
  const connection = await dbConnect()

  try {
    const [rows] = await connection.execute(`
      SELECT es.*, p.nama as paket_nama
      FROM exam_session es
      JOIN paket p ON es.paket_id = p.id
      WHERE es.user_id = ?
      ORDER BY es.start_time DESC
    `, [userId])

    return rows
  } finally {
    await connection.end()
  }
}
