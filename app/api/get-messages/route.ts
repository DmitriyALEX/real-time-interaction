import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/helpers/prismadb'

export async function GET(req: NextRequest, response: NextResponse) {
    try {
        const { searchParams } = req.nextUrl
        const userId = searchParams.get('userId')

        if (userId) {
            const userMessages = await prisma.message.findMany({
                where: { toUserId: userId },
            })
            return NextResponse.json(userMessages)
        }
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
