'use client'

import { useState } from 'react'
import { LuArrowLeft, LuSend, LuCircleCheck } from 'react-icons/lu'
import Link from 'next/link'
import styles from './contact.module.css'
import Header from '../components/header'
import BottomNav from '../components/bottomNav'

const subjects = ['Bug Report', 'Feature Request', 'Account Issue', 'Other']

export default function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!subject || !message.trim()) return
    // TODO: wire up to your API
    setSent(true)
  }

  if (sent) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <LuCircleCheck size={40} className={styles.successIcon} />
          <p className={styles.successTitle}>Message sent</p>
          <p className={styles.successSub}>We'll get back to you within 24 hours.</p>
          <Link href="/profile" className={styles.backLink}>
            Back to profile
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/profile" className={styles.back}>
          <LuArrowLeft size={20} />
        </Link>
        <h1 className={styles.title}>Contact Us</h1>
      </div>

      <p className={styles.subtitle}>Got an issue or feedback? We're listening.</p>

      <div className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Subject</label>
          <div className={styles.chips}>
            {subjects.map((s) => (
              <button
                key={s}
                className={`${styles.chip} ${subject === s ? styles.chipActive : ''}`}
                onClick={() => setSubject(s)}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Message</label>
          <textarea
            className={styles.textarea}
            placeholder="Describe your issue or suggestion..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
          <span className={styles.charCount}>{message.length} / 500</span>
        </div>

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