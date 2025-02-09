import { NextResponse } from 'next/server'
import z from 'zod'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const userSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    instagram: z.string().optional(),
    tweeter: z.string().optional()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validation = userSchema.safeParse(body)
        
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.flatten().fieldErrors },
                { status: 400 }
            )
        }

        const { name, username, email, password, instagram, tweeter } = validation.data
        
        // Check for existing user
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists with this email or username' },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                instagram,
                tweeter
            }
        })

        return NextResponse.json({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            }
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create account. Please try again.' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}