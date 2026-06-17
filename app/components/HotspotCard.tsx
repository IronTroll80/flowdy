import Link from 'next/link'
import { LuClock, LuUsers, LuMapPin, LuArrowRight } from 'react-icons/lu'
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

// Added RGB values to easily create soft translucent backgrounds
const levelMeta: Record<TrafficLevel, { label: string; color: string; rgb: string }> = {
  low:         { label: 'Low',       color: '#22c55e', rgb: '34, 197, 94' },
  moderate:    { label: 'Moderate',  color: '#f59e0b', rgb: '245, 158, 11' },
  high:        { label: 'High',      color: '#ef4444', rgb: '239, 68, 68' },
  'very-high': { label: 'Very High', color: '#cc3333', rgb: '204, 51, 51' },
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
      {/* Image with overlaid status pills */}
      <div className={styles.imageWrap}>
        <img src={imageUrl} alt={name} className={styles.image} />
        
        {/* Traffic Level Pill with pulsing "Live" dot */}
        <span 
          className={styles.pill} 
          style={{ 
            background: `rgba(${meta.rgb}, 0.15)`, 
            color: meta.color,
            border: `1px solid rgba(${meta.rgb}, 0.2)`
          }}
        >
          <span className={styles.pulseDot} style={{ background: meta.color }} />
          {meta.label}
        </span>

        {/* People Count Tag (Glassmorphism) */}
        <div className={styles.peopleTag}>
          <LuUsers size={12} />
          <span>{estimatedPeople}</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.topRow}>
          <div className={styles.nameBlock}>
            <p className={styles.name}>{name}</p>
            <p className={styles.address}>
              <LuMapPin size={12} />
              {address}
            </p>
          </div>
          
          {/* Traffic Rating Badge */}
          <div 
            className={styles.ratingBlock} 
            style={{ background: `rgba(${meta.rgb}, 0.12)` }}
          >
            <span className={styles.ratingNum} style={{ color: meta.color }}>
              {trafficRating}%
            </span>
          </div>
        </div>

        {/* Traffic bar */}
        <div className={styles.barTrack}>
          <div
            className={styles.barFill}
            style={{ width: `${trafficRating}%`, background: meta.color }}
          />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <LuClock size={13} />
            <span>Updated {updatedMinsAgo} min ago</span>
          </div>
          <div className={styles.footerArrow}>
            <LuArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  )
}