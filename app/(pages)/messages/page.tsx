'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/app/context/authContext'

const Messages = () => {
    const { fetchedData } = useAuth()
    // const [socket, setSocket] = useState<Socket | undefined>(undefined)

    const [messages, setMessages] = useState<{ id: string; fromUserId: string; toUserId: string; message: string }[]>(
        [],
    )

    const userId = fetchedData?.checkUser.id

    useEffect(() => {
        if (!userId) return

        const newSocket = io('http://localhost:5000/', { query: { userId } })
        // setSocket(newSocket)

        newSocket.on('message', msg => {
            console.log('msg', msg)
            setMessages(prevMessages => [...prevMessages, msg])
        })

        return () => {
            newSocket.disconnect()
        }
    }, [userId])

    return (
        <div className={styles.input_messages_container}>
            <p>input messages</p>
            <div>
                {messages.map(msgItem => (
                    <div key={msgItem.id}>
                        <p>{msgItem.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Messages
