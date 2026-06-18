'use client'

import { FaTrafficLight } from 'react-icons/fa'
import styles from './welcomeModal.module.css'
import { useEffect, useState } from 'react'
import { LuBell, LuCar } from 'react-icons/lu'

export default function WelcomeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('flowdy_first_login')

    if (seen === 'true') {
      setOpen(true)
    }
  }, [])

  if (!open) return null

  const close = () => {
    localStorage.removeItem('flowdy_first_login')
    setOpen(false)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Welcome to Flowdy</h2>

        <p>
          We help you discover real-time traffic levels around your campus and city hotspots.
        </p>

        <ul>
          <li><FaTrafficLight /> Live hotspot traffic updates</li>
          <li><LuCar /> Smarter movement decisions</li>
          <li><LuBell /> Instant alerts when places get busy</li>
        </ul>

        <button onClick={close} className={styles.button}>
          Get Started
        </button>
      </div>
    </div>
  )
}