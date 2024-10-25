'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import Input from '@/app/shared/Input'
import SecondaryButton from '@/app/shared/SecondaryButton'
import FetchUserProfile from '@/app/utils/FetchUserProfile'
import { IPublicProfile } from '@/app/types/publicProfile.interface'

const SearchUserInput = () => {
    const router = useRouter()
    const [inputValue, setInputValue] = useState('')
    const [userData, setUserData] = useState<IPublicProfile | null>(null)

    const [foundedInfoContainer, setFoundedInfoContainer] = useState(false)

    const handleFind = async () => {
        const data = await FetchUserProfile(inputValue)
        setUserData(data)
    }

    const handleRoute = () => {
        if (userData) {
            router.push(`/${userData.checkedUsername}`)
            setFoundedInfoContainer(false)
        }
    }

    useEffect(() => {
        if (userData) {
            setFoundedInfoContainer(true)
        }
    }, [userData])

    return (
        <section className={styles.search_container}>
            <p>Search by username</p>
            <div className={styles.input_container}>
                <div className={styles.input_container_input}>
                    <Input onChange={setInputValue} />
                </div>

                <SecondaryButton title={'search'} onClick={() => handleFind()} />
            </div>
            {foundedInfoContainer && (
                <section className={styles.founded_info_container}>
                    {userData && userData.status === 'user found' && (
                        <div>
                            <p>{userData.checkedUsername}</p>
                            <div className={styles.user_main_info}>
                                {userData.checkUser.image && (
                                    <Image src={userData.checkUser.image} alt="user logo" width={20} height={20} />
                                )}

                                <button onClick={handleRoute} className={styles.route_button}>
                                    {userData.checkUser.fullName}
                                </button>
                            </div>
                        </div>
                    )}
                    {userData && userData.status === 'user not found' && <div>user not found</div>}
                </section>
            )}
        </section>
    )
}

export default SearchUserInput
