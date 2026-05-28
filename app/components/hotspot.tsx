import styles from './hotspot.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { LuArrowRight, LuClock, LuMapPin } from 'react-icons/lu'

const statusConfig = {
  busy: {
    label: 'Busy',
    color: '#cc3333',
  },
  moderate: {
    label: 'Moderate',
    color: '#e6a700',
  },
  free: {
    label: 'Free',
    color: '#2fbf71',
  },
} as const

export default function Hotspot({
  image = '/hotspot1.jpg',
  name = 'Hotspot Name',
  location = 'School Gate, University of Ilorin, P.M.B 1515 Ilorin',
  traffic = 88,
  status = 'busy' as keyof typeof statusConfig,
  updated = '10 mins ago',
  href = '/hotspot1',
}) {
  const currentStatus = statusConfig[status]

  return (
    <div className={styles.hotspot}>
      <Image
        src={image}
        alt={name}
        fill
        className={styles.hotspotImage}
      />

      <div
        className={styles.tag}
        style={{ backgroundColor: currentStatus.color }}
      >
        {currentStatus.label}
      </div>

      <div className={styles.hotspotInfo}>
        <div className={styles.hotspotHeader}>
          <div>
            <h2 className={styles.hotspotName}>{name}</h2>

            <div className={styles.hotspotLocation}>
              <LuMapPin />
              <p>{location}</p>
            </div>
          </div>

          <p className={styles.hotspotStatus}>
            <span style={{ color: currentStatus.color }}>
              {traffic}%
            </span>
            <br />
            Traffic Rating
          </p>
        </div>

        <div className={styles.hotspotBar}>
          <div
            className={styles.hotspotLevel}
            style={{
              width: `${traffic}%`,
              backgroundColor: currentStatus.color,
            }}
          />
        </div>

        <div className={styles.hotspotFooter}>
          <p className={styles.hotspotFooterText}>
            <LuClock />
            Last Updated: {updated}
          </p>

          <Link href={href} className={styles.viewDetails}>
            View Details
            <LuArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}