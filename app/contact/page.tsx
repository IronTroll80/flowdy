'use client'

import { useState } from 'react'
import { LuArrowLeft, LuSend, LuCircleCheck } from 'react-icons/lu'
import Link from 'next/link'
import styles from './contact.module.css'
import Header from '../components/header'
import BottomNav from '../components/bottomNav'

const subjects = [
  'Bug Report',
  'Feature Request',
  'Account Issue',
  'Other'
]

export default function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!subject || !message.trim()) return
    setSent(true)
  }

  if (sent) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successIconWrap}>
              <LuCircleCheck size={26} />
            </div>

            <h2>Message sent</h2>
            <p>We’ll get back to you within 24 hours.</p>

            <Link href="/profile" className={styles.successBtn}>
              Back to profile
            </Link>
          </div>
        </div>
        <BottomNav />
      </>
    )
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/profile" className={styles.back}>
            <LuArrowLeft size={18} />
          </Link>

          <div>
            <h1>Contact Us</h1>
            <p>We’re here to help</p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className={styles.card}>
          {/* SUBJECT */}
          <div className={styles.fieldGroup}>
            <label>Subject</label>

            <div className={styles.chips}>
              {subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`${styles.chip} ${
                    subject === s ? styles.chipActive : ''
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE */}
          <div className={styles.fieldGroup}>
            <label>Message</label>

            <textarea
              className={styles.textarea}
              placeholder="Tell us what’s happening..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />

            <span className={styles.charCount}>
              {message.length} / 500
            </span>
          </div>

          {/* BUTTON */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!subject || !message.trim()}
          >
            <LuSend size={16} />
            Send Message
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  )
}