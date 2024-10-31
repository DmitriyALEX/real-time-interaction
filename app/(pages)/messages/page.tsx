'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/app/context/authContext'
import { urls } from '@/app/config/urls'
import { IMessage } from '@/app/types/message.interface'

const Messages = () => {
    const { fetchedData } = useAuth()

    const [messages, setMessages] = useState<IMessage[]>([])

    const userId = fetchedData?.checkUser.id

    //websocket server
    const WEBSOKET_SERVER = process.env.NEXT_PUBLIC_DEPLOYED_WEBSOCKET_SERVER || 'http://localhost:5000/'

    useEffect(() => {
        if (!userId) return

        const newSocket = io(WEBSOKET_SERVER, { query: { userId } })

        newSocket.on('message', msg => {
            console.log('msg', msg)
            setMessages(prevMessages => [...prevMessages, msg])
        })

        return () => {
            newSocket.disconnect()
        }
    }, [userId])

    useEffect(() => {
        const getMessages = async () => {
            if (userId) {
                const res = await fetch(`${urls.getMessages}?userId=${userId}`)
                const data = await res.json()
                setMessages(data)
            }
        }
        getMessages()
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
