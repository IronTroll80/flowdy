'use client';
import { useState } from 'react';
import styles from './savedContent.module.css';
import Hotspot from './hotspot';
import {LuSearch } from 'react-icons/lu';
import MainButton from './mainButton';



export default function SavedContent (){

    const [auth, setAuth] = useState(false);

    return (
        <>
        
        
            <div className={styles.container}>
            
                <h1 className={styles.title}>Saved Hotspots</h1>
            {auth ? <>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search saved hotspots..." className={styles.searchInput} />
                    <LuSearch size={20} className={styles.searchIcon} />
                </div>
            <div className= {styles.hotspotContainer}>
                <Hotspot />
                <Hotspot />
            </div> 
            </>
            : 
            <div className={styles.noAuthContainer}>
            <h3 className={styles.messageTitle}>You’re not Signed In</h3>
            <p className={styles.message}>Sign in to save hotspots and get notifications  traffic status changes and much more! </p>
            <MainButton title = 'Create Account or Login' onClick={() => setAuth(true)} />
        </div>}
        </div>
        
        
        </>
    )
}