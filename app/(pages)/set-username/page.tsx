'use client'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { urls } from '@/app/config/urls'
import { useAuth } from '@/app/context/authContext'
import SecondaryButton from '@/app/shared/SecondaryButton'

const UserName = () => {
    const router = useRouter()
    const { user, setFetchedData } = useAuth()

    const [username, setUsername] = useState<string>('')
    const [checkResponse, setCheckResponse] = useState<boolean>(false)
    const [verifiedUsername, setVerifiedUsername] = useState<string>('')
    const [warning, setWarning] = useState<boolean>(false)

    useEffect(() => {
        if (username) {
            const regExp = /^[A-Za-z0-9_-]+$/
            if (regExp.test(username)) {
                setVerifiedUsername(username)
                setWarning(false)
            } else {
                setWarning(true)
            }
        }
    }, [username])

    const handleSetUsername = async () => {
        try {
            if (username === verifiedUsername) {
                const response = await fetch(urls.setUsername, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'post',
                    body: JSON.stringify({
                        userName: verifiedUsername,
                        userEmail: user?.email,
                    }),
                })

                const result = await response.json()
                if (result.success === true) {
                    setCheckResponse(result.success)
                    setFetchedData(result)
                }
            } else {
                setWarning(true)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (checkResponse === true) {
            router.push(`/${verifiedUsername}`)
        }
    }, [checkResponse, router, verifiedUsername])

    return (
        <section className={styles.set_username_container}>
            <div className={styles.set_username_wrapper}>
                {warning ? <p className={styles.correct_name_warning}>Set correct username</p> : ''}

                <p className={styles.allowed_characters}>
                    <span
                        className={warning ? styles.allowed_characters_title_warning : styles.allowed_characters_title}
                    >
                        Allowed characters are:
                    </span>
                    &nbsp;A-Z a-z 0-9 _ -
                </p>

                {/* INPUT FIELD */}
                <div style={{ margin: '10px' }}>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </div>

                {/*  CONFIRM BUTTON */}
                <div style={{ margin: '10px' }}>
                    <SecondaryButton title={'confirm'} onClick={handleSetUsername}></SecondaryButton>
                </div>
            </div>
        </section>
    )
}

export default UserName
