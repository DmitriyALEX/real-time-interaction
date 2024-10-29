import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/helpers/prismadb'

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json()

        const checkUsername = await prisma.username.findFirst({
            where: { username: username },
        })

        if (!checkUsername) {
            return NextResponse.json({ status: 'user not found' })
        }

        if (checkUsername) {
            const user = await prisma.user.findUnique({
                where: { id: checkUsername.userId },
            })

            //ONLY PUBLIC INFO
            const userData = {
                id: user?.id,
            }

            return NextResponse.json({
                status: 'user found',
                checkUser: userData,
                checkedUsername: checkUsername.username,
            })
        }
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
