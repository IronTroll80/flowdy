'use client'

import { LuDoorOpen } from 'react-icons/lu'
import styles from './signOutModal.module.css'

interface SignOutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function SignOutModal({ isOpen, onClose, onConfirm }: SignOutModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drag} />

        <div className={styles.iconWrap}>
          <LuDoorOpen size={24} />
        </div>

        <p className={styles.title}>Sign out?</p>
        <p className={styles.sub}>You'll need to sign in again to access your account.</p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}