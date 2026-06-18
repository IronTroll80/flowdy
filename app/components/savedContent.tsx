'use client'

import { useEffect, useState } from 'react'
import styles from './savedContent.module.css'
import { LuSearch } from 'react-icons/lu'
import MainButton from './mainButton'
import { useRouter } from 'next/navigation'
import HotspotCard from './HotspotCard'
import { getHotspots } from '../../lib/hotspot'
import HotspotSkeleton from './hotspotSkeleton'
import { useUserProfile } from '../hooks/useUserProfile'
import { getSavedPlaces } from '@/lib/savedPlaces'

export default function SavedContent() {
  const router = useRouter()

  const { user, profile, loading } = useUserProfile()

  const [hotspots, setHotspots] = useState<any[]>([])
  const [fetchingHotspots, setFetchingHotspots] = useState(false)

  function calculateMinutesAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime()
    return Math.floor(diff / 60000)
  }

useEffect(() => {
  const loadSaved = async () => {
    if (!user) return

    setFetchingHotspots(true)

    try {
      const data = await getSavedPlaces(user.id)

      const formatted = data.map((item: any) => item.hotspots)

      setHotspots(formatted)
    } finally {
      setFetchingHotspots(false)
    }
  }

  loadSaved()
}, [user])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Checking session...</p>
      </div>
    )
  }


  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Saved Hotspots</h1>

        <div className={styles.noAuthContainer}>
          <h3 className={styles.messageTitle}>
            You’re not signed in
          </h3>

          <p className={styles.message}>
            Sign in to save hotspots and get live traffic updates
          </p>

          <MainButton
            title="Login or Create Account"
            onClick={() => router.push('/login')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Saved Hotspots</h1>

      <div className={styles.searchWrap}>
          <LuSearch size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search locations…"
          />
        </div>

        <div className={styles.hotspotList}>
          {fetchingHotspots
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
  )
}