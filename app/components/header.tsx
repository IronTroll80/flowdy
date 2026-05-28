'use client'

import Image from 'next/image'
import styles from './header.module.css'
import { LuCircleUser, LuMapPin, LuX } from 'react-icons/lu'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import LocationPopup from './locationPopup'

export default function Header() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return(
        <>
        
        <div className= {styles.container}>
            <div className= {styles.left}>
                <Image src="/logo.png" alt="Flowdy Logo" width={30} height={30} />
                <h1 className={styles.title}>Flowdy NG</h1>
            </div>
            <div className= {styles.right}>
                <div className= {styles.locationTab} onClick={()=>{setIsPopupOpen(true)}}>
                    <LuMapPin size={12} color="#1c1c1c" />
                    <span className={styles.locationText}>Lagos, Nigeria</span>
                    <FaChevronDown size={10} color="#1c1c1c" />
                </div>
                <LuCircleUser size={20} color="#1c1c1c" strokeWidth={1}/>
            </div>
        </div>


       {isPopupOpen && (<LocationPopup onClose={() => setIsPopupOpen(false)} />)}

        
        </>
    )
}