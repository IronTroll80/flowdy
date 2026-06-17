'use client'

import styles from './hotspotSkeleton.module.css'

export default function HotspotSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />

      <div className={styles.content}>
        <div className={styles.lineShort} />
        <div className={styles.lineLong} />

        <div className={styles.meta}>
          <div className={styles.pill} />
          <div className={styles.pill} />
        </div>
      </div>
    </div>
  )
}