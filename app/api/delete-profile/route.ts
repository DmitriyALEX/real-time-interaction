import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/helpers/prismadb'
import admin from '@/app/config/firebaseAdmin'

export async function DELETE(req: NextRequest) {
    const { userId } = await req.json()
    const authHeader = req.headers.get('authorization')
    const token = authHeader ? authHeader.split(' ')[1] : null

    if (!token) {
        return NextResponse.json({ success: false, error: 'warning' })
    }

    try {
        //UID FROM HEADERS
        const decodedToken = await admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid

        //find user by ID from req:
        const deleteUser = await prisma.user.findUnique({
            where: { id: userId },
        })

        const verifiedUser = deleteUser?.uid === uid

        if (!verifiedUser) {
            return NextResponse.json({ success: false, error: 'user not verified' })
        }

        if (!deleteUser) {
            return NextResponse.json({ success: false, error: 'user not found' })
        }

        if (verifiedUser) {
            const deleteUserName = await prisma.username.findUnique({
                where: { userId: userId },
            })

            if (deleteUserName) {
                await prisma.username.delete({
                    where: { userId: userId },
                })

                await prisma.user.delete({
                    where: { id: userId },
                })

                return NextResponse.json({ success: true })
            } else {
                NextResponse.json({ success: false, error: 'username not found' })
            }
        }
        return NextResponse.json({ status: 'userChecked' })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
