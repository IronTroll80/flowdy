'use client'

import { useState } from 'react'
import { LuMapPin, LuNavigation, LuChevronRight } from 'react-icons/lu'
import styles from './locationModal.module.css'

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (campus: string) => void
  currentCampus?: string
}

const campuses = [
  { id: 'unilorin', name: 'University of Ilorin', short: 'UNILORIN' },
  // Add more campuses as Flowdy expands
]

export default function LocationModal({
  isOpen,
  onClose,
  onSelect,
  currentCampus,
}: LocationModalProps) {
  const [selected, setSelected] = useState(currentCampus ?? '')
  const [detecting, setDetecting] = useState(false)

  if (!isOpen) return null

  const handleDetect = () => {
    setDetecting(true)
    // TODO: wire up to geolocation API
    setTimeout(() => {
      setDetecting(false)
      setSelected('unilorin')
    }, 1500)
  }

  const handleConfirm = () => {
    if (selected) onSelect(selected)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drag} />

        <div className={styles.header}>
          <p className={styles.title}>Choose Location</p>
          <p className={styles.sub}>Select the location you want to monitor.</p>
        </div>

        <button className={styles.detectBtn} onClick={handleDetect} disabled={detecting}>
          <LuNavigation size={16} />
          {detecting ? 'Detecting…' : 'Use my location'}
        </button>

        <div className={styles.divider}>
          <span>or pick manually</span>
        </div>

        <div className={styles.list}>
          {campuses.map((campus) => (
            <button
              key={campus.id}
              className={`${styles.campusRow} ${selected === campus.id ? styles.campusActive : ''}`}
              onClick={() => setSelected(campus.id)}
            >
              <div className={styles.campusLeft}>
                <div className={styles.campusIcon}>
                  <LuMapPin size={16} />
                </div>
                <div>
                  <p className={styles.campusName}>{campus.name}</p>
                  <p className={styles.campusShort}>{campus.short}</p>
                </div>
              </div>
              <div className={`${styles.radio} ${selected === campus.id ? styles.radioActive : ''}`} />
            </button>
          ))}
        </div>

        <button className={styles.confirmBtn} onClick={handleConfirm} disabled={!selected}>
          Confirm
        </button>
      </div>
    </div>
  )
}