import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/helpers/prismadb'

export async function POST(req: NextRequest) {
    try {
        const { userName, userEmail } = await req.json()

        const checkUserInfo = await prisma.user.findUnique({
            where: { email: userEmail },
        })

        if (checkUserInfo && checkUserInfo.id) {
            //user data founded by req. email
            const userData = {
                id: checkUserInfo.id,
                email: checkUserInfo.email,
                fullName: checkUserInfo.fullName,
                image: checkUserInfo.image,
            }

            const existingUsername = await prisma.username.findUnique({
                where: { userId: checkUserInfo.id },
            })

            if (existingUsername) {
                const updatedUsername = await prisma.username.update({
                    where: { userId: checkUserInfo.id },
                    data: { username: userName },
                })
                return NextResponse.json({ success: true, checkedUsername: updatedUsername })
            } else {
                const createdUsername = await prisma.username.create({
                    data: {
                        userId: checkUserInfo.id,
                        username: userName,
                    },
                })

                return NextResponse.json({ success: true, checkUser: userData, checkedUsername: createdUsername })
            }
        } else {
            return NextResponse.json({ success: false })
        }

        return NextResponse.json({ status: 'userChecked' })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
