import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    // In real implementation, get user ID from session
    const userId = 1 // Temporary hardcoded user ID

    // Get user's crushes
    const userCrushes = await prisma.crush.findMany({
      where: { userId },
      select: { crushedUserId: true }
    })

    // Check mutual matches
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

        return mutualCrush ? {
          ...mutualCrush.crushedUser,
          matchPercentage: calculateMatchPercentage(),
          commonInterests: getCommonInterests()
        } : null
      })
    )

    const validMatches = matches.filter(match => match !== null)

    return NextResponse.json({ matches: validMatches })
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