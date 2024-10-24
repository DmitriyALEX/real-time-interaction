import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/helpers/prismadb'

export async function POST(req: NextRequest, response: NextResponse) {
    try {
        const userInfo = await req.json()

        const checkUserInfo = await prisma.user.findUnique({
            where: { email: userInfo.email },
        })

        if (!checkUserInfo) {
            const newUser = await prisma.user.create({
                data: {
                    email: userInfo.email,
                    fullName: userInfo.fullName,
                    image: userInfo.image,
                    uid: userInfo.uid,
                },
            })

            const newUserData = {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                image: newUser.image,
            }
            return NextResponse.json({ status: 'userCreated', checkUser: newUserData })
        }

        if (checkUserInfo) {
            const checkUserData = {
                id: checkUserInfo.id,
                email: checkUserInfo.email,
                fullName: checkUserInfo.fullName,
                image: checkUserInfo.image,
            }
            const usernameInfo = await prisma.username.findUnique({
                where: { userId: checkUserInfo.id },
            })

            if (!usernameInfo) {
                return NextResponse.json({ status: 'username not found' })
            }

            return NextResponse.json({ status: 'userChecked', checkUser: checkUserData, checkedUsername: usernameInfo })
        }

        // return NextResponse.json({ status: 'userChecked' })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
