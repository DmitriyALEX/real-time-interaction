import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { IButton } from '../../types/button.interface'

const SecondaryButton: React.FC<IButton> = ({ title, alt, onClick, image_link, onLoad }) => {
    return (
        <>
            <button className={styles.secondary_button} onClick={onClick}>
                {image_link && alt && <Image src={image_link} alt={alt} onLoad={onLoad} width={20} height={20} />}
                {title}
            </button>
        </>
    )
}

export default SecondaryButton
