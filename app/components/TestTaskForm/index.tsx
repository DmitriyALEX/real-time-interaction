'use client'
import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface IInfoFormProps {
    userId: string | null
}

const TestTaskForm: React.FC<IInfoFormProps> = ({ userId }) => {
    const [socket, setSocket] = useState<Socket | undefined>(undefined)
    const [textInput, setTextInput] = useState('')

    useEffect(() => {
        if (!userId) return

        const newSocket = io('http://localhost:5000/', { query: { userId } })
        newSocket.on('message', msg => {
            console.log(`message1 ${msg}`)
        })
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [userId])

    const handleSendMessage = () => {
        if (socket) {
            socket?.emit('message', textInput)
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
