import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

interface UserPayload {
  userId: number
  email: string
  username: string
}

export function getCurrentUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
    return decoded
  } catch (error) {
    return null
  }
} 
