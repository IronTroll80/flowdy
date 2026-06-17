'use client'

import styles from './bottomNav.module.css'
import { useRouter, usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { LuHouse, LuBookmark, LuMap, LuUser, LuCreditCard } from 'react-icons/lu'

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { name: 'home', Icon: LuHouse, route: '/', label: 'Home' },
    { name: 'saved', Icon: LuBookmark, route: '/saved', label: 'Saved' },
    { name: 'Flowpass', Icon: LuCreditCard, route: '/flowpass', label: 'Flowpass' },
    { name: 'profile', Icon: LuUser, route: '/profile', label: 'Profile' },
  ]

  const activeIndex = useMemo(() => {
    const idx = tabs.findIndex(t => pathname === t.route)
    return idx >= 0 ? idx : 0
  }, [pathname])

  return (
    <div className={styles.container}>
      <nav className={styles.bottomNav} role="tablist">

        {/* pastel sliding pill */}
        <div
          className={styles.indicator}
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />

        {tabs.map((tab, index) => {
          const { Icon } = tab
          const isActive = index === activeIndex

          return (
            <button
              key={tab.name}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => router.push(tab.route)}
              role="tab"
            >
              <span className={styles.iconWrapper}>
                <Icon size={22} />
              </span>

              <span className={styles.label}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}