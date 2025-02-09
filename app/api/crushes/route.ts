import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/getCurrentUser';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { crushes } = await req.json();
    
    // Validate crush IDs
    if (!Array.isArray(crushes) || crushes.some(id => typeof id !== 'number')) {
      return NextResponse.json({ error: 'Invalid crush data' }, { status: 400 });
    }

    // Delete existing crushes and create new ones
    await prisma.$transaction([
      prisma.crush.deleteMany({
        where: { userId: currentUser.userId }
      }),
      prisma.crush.createMany({
        data: crushes.map(crushId => ({
          userId: currentUser.userId,
          crushedUserId: crushId
        }))
      })
    ]);

    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save crushes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 