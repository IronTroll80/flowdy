'use client'

import styles from './bottomNav.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { LuBookmark, LuHouse, LuMap, LuUser } from 'react-icons/lu';

export default function BottomNav() {
  const router = useRouter();  
  const pathname = usePathname(); 
  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    { name: 'home', icon: <LuHouse size={24} />, route: '/' },
    { name: 'saved', icon: <LuBookmark size={24} />, route: '/saved' },
    { name: 'map', icon: <LuMap size={24} />, route: '/map' },
    { name: 'profile', icon: <LuUser size={24} />, route: '/profile' },
  ];

  return (
    <>
    
    <div className= {styles.container}>
        <div className = {styles.bottomNav}>
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    className={`${styles.navItem} ${activeTab === tab.name ? styles.active : ''} ${pathname === tab.route ? styles.active : ''}`}
                    onClick={() => {setActiveTab(tab.name); router.push(tab.route);}}
                >
                    {tab.icon}
                    <p>{tab.name}</p>
                </div>
            ))}
        </div>
    </div>
    
    </>
  )

}