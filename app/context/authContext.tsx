'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/app/config/firabase'
import { IFirebaseUser } from '../types/userAuth.interface'
import { useRouter } from 'next/navigation'
import { urls } from '../config/urls'
import { IFetchedData, IUseAuth } from '@/app/types/userAuth.interface'

const AuthContext = createContext<IUseAuth | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('context error')
    }
    return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<IFirebaseUser | null>(null)
    const [accessToken, setAccessToken] = useState<string>('')
    const [fetchedData, setFetchedData] = useState<IFetchedData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (e) {
            console.error(e)
        }
    }

    //REDIRECT
    useEffect(() => {
        if (fetchedData) {
            if (fetchedData.status === 'userCreated') {
                router.push('/set-username')
            } else if (fetchedData.status === 'username not found') {
                router.push('/set-username')
            }
        }
    }, [fetchedData, router])

    const logOut = async () => {
        try {
            await signOut(auth)
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser((currentUser as unknown) as IFirebaseUser)

            if (currentUser) {
                const token = (currentUser as IFirebaseUser)?.stsTokenManager.accessToken
                if (token) setAccessToken(token)

                const response = await fetch(urls.checkUser, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: currentUser.email,
                        fullName: currentUser.displayName,
                        image: currentUser.photoURL,
                        uid: currentUser.uid,
                    }),
                })
                const data = await response.json()
                setFetchedData(data)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, accessToken, fetchedData, setFetchedData, googleSignIn, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
