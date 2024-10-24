'use client'
import { deleteUser, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth } from '@/app/config/firabase'
import { useAuth } from '@/app/context/authContext'
import styles from './styles.module.css'
import { urls } from '@/app/config/urls'
import { useRouter } from 'next/navigation'
import SecondaryButton from '@/app/shared/SecondaryButton'

const Settings = () => {
    const router = useRouter()
    const { user, accessToken, fetchedData } = useAuth()

    const handleDelete = async (userId: string | undefined) => {
        try {
            const response = await fetch(urls.deleteUserProfile, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                body: JSON.stringify({ userId }),
            })

            const result = await response.json()

            if (result.success) {
                try {
                    await deleteUser(user as User)
                    router.push('/')
                } catch (error) {
                    console.error(error)
                    const typedError = error as Error

                    if (typedError.message.includes('auth/requires-recent-login')) {
                        try {
                            const provider = new GoogleAuthProvider()
                            const result = await signInWithPopup(auth, provider)
                            const firebaseUser = result.user
                            await deleteUser(firebaseUser as User)
                            router.push('/')
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <section className={styles.settings_container}>
            <h1 style={{ fontSize: '32px', margin: '20px' }}>Settings</h1>
            <SecondaryButton title={'delete account'} onClick={() => handleDelete(fetchedData?.checkUser.id)} />
        </section>
    )
}

export default Settings
