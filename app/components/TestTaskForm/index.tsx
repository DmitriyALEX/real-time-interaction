'use client'
import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/app/context/authContext'

interface IInfoFormProps {
    toUserId: string | null
}

const TestTaskForm: React.FC<IInfoFormProps> = ({ toUserId }) => {
    const { fetchedData } = useAuth()
    const [socket, setSocket] = useState<Socket | undefined>(undefined)
    const [textInput, setTextInput] = useState('')

    const fromUserId = fetchedData?.checkUser.id

    useEffect(() => {
        if (!toUserId) return

        const newSocket = io('http://localhost:5000/', { query: { toUserId } })
        newSocket.on('message', msg => {
            console.log(`message1 ${msg}`)
        })
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [toUserId])

    const handleSendMessage = () => {
        if (socket) {
            const messageData = {
                fromUserId: fromUserId,
                toUserId: toUserId,
                message: textInput,
            }
            socket?.emit('message', messageData)
            setTextInput('')
        }
    }

    return (
        <div>
            <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} />
            <button onClick={handleSendMessage}>send</button>
        </div>
    )
}

export default TestTaskForm
