import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


// Initialize Prisma client as a global instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  instagram: z.string().optional()
    .transform(val => (!val || val.trim() === '') ? null : val),
  tweeter: z.string().optional()
    .transform(val => (!val || val.trim() === '') ? null : val)
});

type UserInput = z.infer<typeof userSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = userSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, username, email, password, instagram, tweeter } = validation.data;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        instagram,
        tweeter
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    });
    const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, username: newUser.username },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    // Set cookie with token
    const response = NextResponse.json({
        message: 'Account created successfully',
        user: newUser
    });
    
    response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Prisma unique constraint violations
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[];
        
        // Create a user-friendly error message based on the duplicate field
        const fieldMap: Record<string, string> = {
          email: 'email address',
          username: 'username',
          instagram: 'Instagram handle',
          tweeter: 'Twitter handle'
        };

        const duplicateField = target[0];
        const fieldName = fieldMap[duplicateField] || duplicateField;

        return NextResponse.json(
          { 
            error: `This ${fieldName} is already in use. Please choose another one.`,
            field: duplicateField
          },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}