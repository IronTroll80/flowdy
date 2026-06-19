'use client'

import { LuTrash2 } from 'react-icons/lu'
import styles from './deleteContent.module.css'
import BackButton from './goBack'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthProvider'
import { supabase } from '@/lib/supabase'


export default function DeleteAccountContent() {

  const warnings = [
    {
      text: "All your saved data will be lost along with your bookmarks",
      type: "danger",
    },
    {
      text: "You will be signed out of all devices immediately",
      type: "danger",
    },
    {
      text: "After 30 days, your account and data will be permanently erased",
      type: "danger",
    },
    {
      text: "You can reactivate within 30 days by signing back in",
      type: "success",
    },
  ]

  const router = useRouter()

  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()


  const holdInterval = useRef<NodeJS.Timeout | null>(null)

  const startHold = () => {
  setHolding(true)
  setProgress(0)

  const start = Date.now()

  holdInterval.current = setInterval(() => {
    const elapsed = Date.now() - start
    const percent = Math.min(elapsed / 2000, 1)

    setProgress(percent)

    if (percent >= 1) {
      clearInterval(holdInterval.current!)
      handleDelete()
    }
  }, 50)
}

const stopHold = () => {
  setHolding(false)
  setProgress(0)

  if (holdInterval.current) {
    clearInterval(holdInterval.current)
  }
}

const handleDelete = async () => {
  setLoading(true)
  if (!user) return

  const res = await fetch('/api/delete-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id }),
  })

  if (res.ok) {
    await supabase.auth.signOut()
    router.push('/signup')
  }

  setLoading(false)
}

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <BackButton />
        <h1>Delete Account</h1>
      </div>

      {/* HERO WARNING CARD */}
      <div className={styles.heroCard}>
        <div className={styles.heroIcon}>
          <LuTrash2 size={18} />
        </div>

        <h2>Delete your account</h2>
        <p>
          This will start a 30-day deletion process. 
          Your data will be permanently removed after this period.
        </p>
      </div>

      {/* INFO CARD */}
      <div className={styles.infoCard}>
        <h3>What happens next</h3>

        <div className={styles.list}>
          {warnings.map((item, index) => (
            <div key={index} className={styles.item}>
              <span className={`${styles.dot} ${styles[item.type]}`} />

              <p className={styles.text}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION AREA */}
      <p className={styles.instruction}>
        Hold the button to confirm deletion
      </p>

      <div className={styles.holdBar}>
        <div
          className={styles.holdFill}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <button
        className={styles.deleteBtn}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {loading ? 'Deleting...' : 'Hold to Delete Account'}
      </button>

      <button className={styles.cancelBtn} onClick = {()=>{router.back()}}>
        Cancel
      </button>

    </div>
  )
}