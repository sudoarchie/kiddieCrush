import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const signinSchema = z.object({
    emailOrUsername: z.string(),
    password: z.string().min(8)
})

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

        const { emailOrUsername, password } = validation.data
        
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid email/username or password' },
                { status: 401 }
            )
        }

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
