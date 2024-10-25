import React from 'react'
import SearchUserInput from '@/app/components/SearchUserInput'
import styles from './styles.module.css'

const Header = () => {
    return (
        <header className={styles.header_container}>
            <section className={styles.search_container}>
                <SearchUserInput />
            </section>
        </header>
    )
}

export default Header
