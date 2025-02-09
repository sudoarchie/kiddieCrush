import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getCurrentUser } from '@/lib/getCurrentUser'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const search = req.nextUrl.searchParams.get('search') || ''

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: currentUser.userId } }, // Exclude current user
          {
            OR: [
              { username: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true
      },
      take: 5 // Limit results
    })

    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 