'use client'

import { useEffect, useState } from 'react'
import styles from './emailAuthContent.module.css'
import MainButton from './mainButton'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function EmailAuthContent() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedEmail = localStorage.getItem('signup_email')

    if (!storedEmail) {
      router.push('/signup')
      return
    }

    setEmail(storedEmail)
  }, [router])

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`
  }

  const handleResend = async () => {
    if (secondsLeft > 0 || loading) return

    try {
      setLoading(true)

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        console.error(error.message)
        return
      }

      setSecondsLeft(60)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirm Email</h1>

      <p className={styles.subtitle}>
        We've sent a confirmation email to <strong>{email}</strong>.
        Click the link in the email to activate your account.
      </p>

      <div className={styles.buttonContainer}>
        <MainButton
          title="Back to Login"
          onClick={() => router.push('/login')}
        />
      </div>

      <p className={styles.resend}>
        {secondsLeft > 0 ? (
          <>
            Resend Email in <span>{formatTime(secondsLeft)}</span>
          </>
        ) : (
          <span
            onClick={handleResend}
            style={{
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {loading ? 'Sending...' : 'Resend Email'}
          </span>
        )}
      </p>
    </div>
  )
}