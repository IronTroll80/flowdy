'use client'

import { LuSearch, LuChevronRight, LuDoorClosed, LuSchool, LuBuilding, LuLibrary, LuHouse, LuBuilding2 } from 'react-icons/lu'
import HotspotCard from './components/HotspotCard'
import styles from './components/home.module.css'
import Header from './components/header'
import BottomNav from './components/bottomNav'
import { useEffect, useState } from 'react'
import { getHotspots } from '../lib/hotspot'

const categories = [
  {
    id: 'gates',
    label: 'Transportation',
    icon: <LuDoorClosed />,
    className: styles.largeCard
  },
  {
    id: 'faculties',
    label: 'Faculties',
    icon: <LuSchool />,
    className: styles.smallCard
  },
  {
    id: 'cafeterias',
    label: 'Buildings',
    icon: <LuBuilding2 />,
    className: styles.smallCard
  }
]
export default function HomePage() {

    const [hotspots, setHotspots] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getHotspots()
      setHotspots(data)
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


      <div className={styles.hero}>
        
      </div>

      <div className={styles.searchWrap}>
        <LuSearch size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search locations…"
        />
      </div>

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

      {/* ── Hotspots ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionTitle}>Nearby Hotspots</p>
          <button className={styles.seeAll}>
            See all <LuChevronRight size={14} />
          </button>
        </div>

        <div className={styles.hotspotList}>
          {hotspots.map((h: any) => (
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