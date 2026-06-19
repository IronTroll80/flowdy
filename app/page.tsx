'use client'

import { useEffect, useState } from 'react'
import {
  LuSearch,
  LuChevronRight,
  LuDoorClosed,
  LuSchool,
  LuBuilding2,
  LuBus,
  LuBusFront
} from 'react-icons/lu'

import HotspotCard from './components/HotspotCard'
import styles from './components/home.module.css'
import Header from './components/header'
import BottomNav from './components/bottomNav'
import { getHotspots } from '../lib/hotspot'
import HotspotSkeleton from './components/hotspotSkeleton'

const categories = [
  {
    id: 'gates',
    label: 'Transportation',
    icon: <LuBusFront />,
    className: styles.largeCard
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: <LuSchool />,
    className: styles.smallCard
  },
  {
    id: 'government',
    label: 'Agencies',
    icon: <LuBuilding2 />,
    className: styles.smallCard
  }
]

export default function HomePage() {
  const [hotspots, setHotspots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await getHotspots()
        setHotspots(data)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  function calculateMinutesAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime()
    return Math.floor(diff / 60000)
  }

  return (
    <>
      <Header />

      <div className={styles.page}>

        <div className={styles.hero} />

        <div className={styles.searchWrap}>
          <LuSearch size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search locations…"
          />
        </div>

        {/* ───── Categories ───── */}
        <div className={styles.section}>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryCard} ${cat.className}`}
              >
                <span className={styles.categoryIcon}>
                  {cat.icon}
                </span>

                <div>
                  <p className={styles.categoryTitle}>{cat.label}</p>
                  <span className={styles.categorySubtitle}>
                    Explore locations
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>Nearby Hotspots</p>
            {/* <button className={styles.seeAll}>
              See all <LuChevronRight size={14} />
            </button> */}
          </div>

          
        <div className={styles.hotspotList}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <HotspotSkeleton key={i} />
              ))
            : hotspots.map((h: any) => (
                <HotspotCard
                  key={h.id}
                  id={h.id}
                  name={h.name}
                  address={h.address}
                  imageUrl={h.image_url}
                  trafficRating={h.traffic_rating}
                  trafficLevel={h.traffic_level}
                  estimatedPeople={h.estimated_people}
                  updatedMinsAgo={calculateMinutesAgo(h.updated_at)}
                />
              ))}
        </div>
            </div>
          
        </div>

      

      <BottomNav />
    </>
  )
}