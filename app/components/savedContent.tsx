'use client'

import { useEffect, useState } from 'react'
import styles from './savedContent.module.css'
import { LuSearch } from 'react-icons/lu'
import MainButton from './mainButton'
import { useRouter } from 'next/navigation'
import HotspotCard from './HotspotCard'
import { getHotspots } from '../../lib/hotspot'
import { supabase } from '@/lib/supabase'
import HotspotSkeleton from './hotspotSkeleton'

export default function SavedContent() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [hotspots, setHotspots] = useState<any[]>([])
  const [fetchingHotspots, setFetchingHotspots] = useState(false)

  function calculateMinutesAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime()
    return Math.floor(diff / 60000)
  }

  // ─── AUTH CHECK ───
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true)

      const { data } = await supabase.auth.getUser()

      setUser(data?.user ?? null)
      setLoading(false)
    }

    checkUser()
  }, [])

  // ─── FETCH HOTSPOTS ONLY IF LOGGED IN ───
  useEffect(() => {
    const loadHotspots = async () => {
      if (!user) return

      setFetchingHotspots(true)

      try {
        const data = await getHotspots()
        setHotspots(data)
      } finally {
        setFetchingHotspots(false)
      }
    }

    loadHotspots()
  }, [user])

  // ─── LOADING STATE ───
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Checking session...</p>
      </div>
    )
  }

  // ─── NOT LOGGED IN ───
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

  // ─── LOGGED IN ───
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Saved Hotspots</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search saved hotspots..."
          className={styles.searchInput}
        />
        <LuSearch size={18} className={styles.searchIcon} />
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