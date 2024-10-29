'use client'
import React, { useState } from 'react'
import styles from './style.module.css'
import TestTaskForm from '@/app/components/TestTaskForm'
import Input from '@/app/shared/Input'
import SecondaryButton from '@/app/shared/SecondaryButton'
import { urls } from '@/app/config/urls'

const TestTask = () => {
    const [inputValue, setInputValue] = useState('')
    const [userId, setUserId] = useState<string | null>(null)

    const [isCandidate, setIsCandidate] = useState(false)

    const handleFind = async () => {
        try {
            const result = await fetch(urls.findUserWebsocket, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({ inputValue }),
            })
            const data = await result.json()

            const userId = data.checkUser.id
            setUserId(userId)

            if (userId) {
                setIsCandidate(true)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <section className={styles.send_form_container}>
            {/* search user */}
            <div className={styles.find_candidate_input_container}>
                {isCandidate && <p style={{ color: 'green' }}>candidate is founded</p>}
                <p></p>
                <p className={styles.find_candidate_input_title}>Find candidate</p>
                <div className={styles.find_candidate_input}>
                    <Input onChange={setInputValue} />
                    <SecondaryButton title={'search'} onClick={() => handleFind()} />
                </div>
            </div>

            {/* set test information */}
            <div className={styles.test_info_container}>
                <TestTaskForm userId={userId} />
            </div>
        </section>
    )
}

export default TestTask
