import Link from 'next/link'
import { LuClock, LuUsers } from 'react-icons/lu'
import styles from './hotspotCard.module.css'

export type TrafficLevel = 'low' | 'moderate' | 'high' | 'very-high'

export interface HotspotCardProps {
  id: string
  name: string
  address: string
  imageUrl: string
  trafficRating: number      // 0–100
  trafficLevel: TrafficLevel
  estimatedPeople: string    // e.g. "120–140"
  updatedMinsAgo: number
}

const levelMeta: Record<TrafficLevel, { label: string; color: string; bar: string }> = {
  low:       { label: 'Low',       color: '#22c55e', bar: '#22c55e' },
  moderate:  { label: 'Moderate',  color: '#f59e0b', bar: '#f59e0b' },
  high:      { label: 'High',      color: '#ef4444', bar: '#ef4444' },
  'very-high': { label: 'Very High', color: '#cc3333', bar: '#cc3333' },
}

export default function HotspotCard({
  id,
  name,
  address,
  imageUrl,
  trafficRating,
  trafficLevel,
  estimatedPeople,
  updatedMinsAgo,
}: HotspotCardProps) {
  const meta = levelMeta[trafficLevel]

  return (
    <Link href={`/hotspot/${id}`} className={styles.card}>
      {/* Image with overlaid status pill */}
      <div className={styles.imageWrap}>
        <img src={imageUrl} alt={name} className={styles.image} />
        <span className={styles.pill} style={{ background: meta.color }}>
          {meta.label}
        </span>
        <div className={styles.peopleTag}>
          <LuUsers size={11} />
          <span>{estimatedPeople}</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.topRow}>
          <div className={styles.nameBlock}>
            <p className={styles.name}>{name}</p>
            <p className={styles.address}>{address}</p>
          </div>
          <div className={styles.ratingBlock}>
            <span className={styles.ratingNum} style={{ color: meta.color }}>
              {trafficRating}%
            </span>
            <span className={styles.ratingLabel}>Traffic</span>
          </div>
        </div>

        {/* Traffic bar */}
        <div className={styles.barTrack}>
          <div
            className={styles.barFill}
            style={{ width: `${trafficRating}%`, background: meta.bar }}
          />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <LuClock size={12} />
          <span>Updated {updatedMinsAgo} min ago</span>
        </div>
      </div>
    </Link>
  )
}
