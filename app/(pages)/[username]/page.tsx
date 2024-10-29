'use client'
import { useAuth } from '@/app/context/authContext'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import Loader from '@/app/shared/Loader'
import SecondaryButton from '@/app/shared/SecondaryButton'
import { useEffect, useState } from 'react'
import { urls } from '@/app/config/urls'

const Profile = ({ params }: { params: { username: string } }) => {
    const { user, fetchedData, setFetchedData, loading, logOut } = useAuth()

    const [userNotFound, setUserNotFound] = useState<boolean>(false)
    const router = useRouter()

    //TODO: exchanged to FetchUserProfile function
    //USER PUBLIC PROFILE
    const loadProfile = async (username: string) => {
        const result = await fetch(urls.publicProfile, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({ username }),
        })
        const data = await result.json()

        if (data.status === 'user not found') {
            setUserNotFound(true)
        } else {
            setFetchedData(data)
        }
    }

    //authorized user username
    const currentUserUsername = fetchedData?.checkedUsername?.username
    useEffect(() => {
        if (!fetchedData && !loading) {
            loadProfile(params.username)
        }
        if (fetchedData) {
            if (params.username !== currentUserUsername) {
                loadProfile(params.username)
            } else {
                if (fetchedData.status === 'userCreated') {
                    router.push('/set-username')
                } else if (fetchedData.status === 'userChecked') {
                    router.push(`/${fetchedData.checkedUsername.username}`)
                } else if (fetchedData.status === 'username not found') {
                    router.push('/set-username')
                } else if (fetchedData.status === 'user not found') {
                    setUserNotFound(true)
                }
            }
        }
    }, [params.username, currentUserUsername, loading])

    if (loading) {
        return <Loader />
    }

    //PRIVATE ROUTE
    const isCurrentUser =
        user && fetchedData?.checkedUsername && params.username === fetchedData?.checkedUsername.username

    //check if fetchedData has user email
    const currentUserEmail = fetchedData?.checkUser?.email

    const handleSettings = () => {
        router.push('/settings')
    }

    const handleTestTaskPage = () => {
        router.push('/test-task')
    }

    return (
        <section className={styles.profile_container}>
            <nav className={styles.navigation_section}>
                {isCurrentUser ? (
                    <>
                        <SecondaryButton title={'Test Task'} onClick={handleTestTaskPage} />
                        <SecondaryButton title={'Log settings'} onClick={handleSettings} />
                    </>
                ) : (
                    ''
                )}
                {user && <SecondaryButton title={'Log out'} onClick={logOut} />}
            </nav>
            <div>
                {userNotFound ? (
                    <div>user not found</div>
                ) : (
                    <>
                        <div>USERNAME: {params.username}</div>
                        <div>USER EMAIL: {currentUserEmail ? fetchedData.checkUser.email : '--------'}</div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Profile
