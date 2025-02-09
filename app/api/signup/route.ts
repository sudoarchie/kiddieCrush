import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

interface User{
    name: string
    username:string
    email: string
    instagram?: string
    tweeter?: string
    password:string
}

const user = z.object({
    name: z.string().nonempty(),
    username: z.string().nonempty(),
    email: z.string().email().nonempty(),
    instagram: z.string().optional(),
    tweeter: z.string().optional(),
    password: z.string().min(8, {message: 'Min length should be 8'})
})

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const validation = user.safeParse(data);
        
        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.flatten() },
                { status: 400 }
            );
        }

        const { name, username, email, password, instagram, tweeter } = validation.data;

        // Check for existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                    ...(instagram ? [{ instagram }] : []),
                    ...(tweeter ? [{ tweeter }] : [])
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with these details already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                ...(instagram && { instagram }),
                ...(tweeter && { tweeter })
            }
        });

        return NextResponse.json({ 
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
