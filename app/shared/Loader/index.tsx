import React from 'react'
import styles from './styles.module.css'

const Loader = () => {
    return (
        <div className={styles.loading_container}>
            <h1 className={styles.loading_title}>loading</h1>
        </div>
    )
}

export default Loader
