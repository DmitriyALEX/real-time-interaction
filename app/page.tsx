'use client'
import styles from './page.module.css'
import { useAuth } from '@/app/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loader from './shared/Loader'
import PrimaryButton from './shared/PrimaryButton'
import Image from 'next/image'

export default function Home() {
    const router = useRouter()
    const { user, fetchedData, googleSignIn, logOut, loading } = useAuth()

    const [redirect, setRedirect] = useState<boolean>(false)
    const [logoLoaded, setLogoLoaded] = useState<boolean>(false)

    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (e) {
            console.error(e)
        }
    }

    // const handleSignOut = async () => {
    //     try {
    //         await logOut()
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    //REDIRECT IF USER AUTHORIZED
    useEffect(() => {
        if (user && fetchedData) {
            setRedirect(true)
            router.push(`${fetchedData?.checkedUsername?.username}`)
        }
    }, [user, fetchedData, router])

    if (loading || redirect || (user && fetchedData)) {
        return <Loader />
    }

    const googleLogo = 'icons/google-logo.svg'

    return (
        <section className={styles.main_container}>
            {/* {!user ? ( */}
            <>
                <PrimaryButton
                    title={'Sign in'}
                    image_link={googleLogo}
                    alt={'google_logo'}
                    onClick={handleSignIn}
                    logoLoaded={logoLoaded}
                />

                {/* FOR STATE WATCHER */}
                <Image
                    src={googleLogo}
                    alt="google_logo"
                    onLoad={() => setLogoLoaded(true)}
                    style={{ display: 'none' }}
                    width={20}
                    height={20}
                />
            </>
            {/* ) : (
                // <button onClick={handleSignOut}>signOutф</button>
                <></>
            )} */}
        </section>
    )
}
