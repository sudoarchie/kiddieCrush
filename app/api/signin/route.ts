import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const signinSchema = z.object({
    username: z.string(),
    password: z.string().min(8)
})

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const validation = signinSchema.safeParse(data)
        
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            )
        }

        const { username, password } = validation.data
        
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: username },
                    { username: username }
                ]
            }
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid email/username or password' },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        const response = NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
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
        return NextResponse.json(
            { error: 'Failed to authenticate. Please try again.' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
