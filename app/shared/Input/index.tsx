'use client'
import React, { useState } from 'react'
import styles from './styles.module.css'

interface IInput {
    onChange: (value: string) => void
}

const Input: React.FC<IInput> = ({ onChange }) => {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (e: string) => {
        setInputValue(e)
        onChange(e)
    }

    return (
        <>
            <input
                type="text"
                className={styles.input}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
            />
        </>
    )
}

export default Input
