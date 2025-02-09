import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getCurrentUser } from '@/lib/getCurrentUser'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = currentUser.userId

    const userCrushes = await prisma.crush.findMany({
      where: { userId },
      select: { crushedUserId: true }
    })

    const matches = await Promise.all(
      userCrushes.map(async ({ crushedUserId }) => {
        const mutualCrush = await prisma.crush.findFirst({
          where: {
            userId: crushedUserId,
            crushedUserId: userId
          },
          include: {
            crushedUser: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true
              }
            }
          }
        })
        return mutualCrush?.crushedUser || null
      })
    )

    return NextResponse.json({ 
      matches: matches.filter(Boolean) 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Temporary mock functions
function calculateMatchPercentage() {
  return Math.floor(Math.random() * 41) + 60 // 60-100%
}

function getCommonInterests() {
  const interests = ['Music', 'Sports', 'Travel', 'Movies', 'Reading']
  return interests.sort(() => 0.5 - Math.random()).slice(0, 3)
} 