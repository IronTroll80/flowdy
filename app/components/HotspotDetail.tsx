'use client'

import {
  LuArrowLeft,
  LuMapPin,
  LuClock,
  LuChevronDown,
  LuExternalLink,
  LuActivity,
  LuTriangle,
} from 'react-icons/lu'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styles from './hotspotDetail.module.css'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toggleSavePlace, isPlaceSaved } from '@/lib/savedPlaces'
import { LuHeart } from 'react-icons/lu'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

type TrafficLevel = 'low' | 'moderate' | 'high' | 'very-high'

type HistoryItem = {
  traffic_rating: number
  recorded_at: string
}

interface HotspotDetailProps {
  id: string
  name: string
  address: string
  imageUrl?: string
  trafficRating: number
  trafficLevel: TrafficLevel
  estimatedPeople: string
  updatedMinsAgo: number
  lat: number
  lng: number
  history: HistoryItem[]
  suggestion: string;
}

const levelMeta: Record<TrafficLevel, { label: string; color: string }> = {
  low: { label: 'Low', color: '#22c55e' },
  moderate: { label: 'Moderate', color: '#f59e0b' },
  high: { label: 'High', color: '#ef4444' },
  'very-high': { label: 'Very High', color: '#cc3333' },
}

export default function HotspotDetail({
  id,
  name,
  address,
  trafficRating,
  trafficLevel,
  estimatedPeople,
  updatedMinsAgo,
  lat,
  lng,
  history,
  suggestion,
}: HotspotDetailProps) {
  const [historyOpen, setHistoryOpen] = useState(false)

  const safeHistory = history ?? []
  const meta = levelMeta[trafficLevel]
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const labels = safeHistory.map((h) =>
    new Date(h.recorded_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  )

  const data = safeHistory.map((h) => h.traffic_rating)

  const chartData = {
    labels,
    datasets: [
      {
        data,
        fill: true,
        borderColor: '#6c3bff',
        borderWidth: 2,
        backgroundColor: (ctx: any) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(108,59,255,0.18)')
          gradient.addColorStop(1, 'rgba(108,59,255,0)')
          return gradient
        },
        pointRadius: 3,
        pointBackgroundColor: '#6c3bff',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        tension: 0.4,
      },
    ],
  }

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: '#f0f0f0' },
        border: { display: false },
        ticks: {
          callback: (v) => `${v}%`,
        },
      },
    },
  }

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`


  useEffect(() => {
  const check = async () => {
    const { data } = await supabase.auth.getUser()
    const user = data?.user

    if (!user) return

    const result = await isPlaceSaved(user.id, id)
    setSaved(result)
  }

  check()
}, [id])

const handleSave = async () => {
  setSaving(true)

  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (!user) return

  const newState = await toggleSavePlace(user.id, id)
  setSaved(newState)

  setSaving(false)
}

  return (
    <div className={styles.page}>

      <div className={styles.topBar}>
        <Link href="/" className={styles.back}>
          <LuArrowLeft size={20} />
        </Link>

        <p className={styles.topTitle}>Hotspot Detail</p>

        <button
          onClick={handleSave}
          disabled={saving}
          className={styles.saveBtn}
        >
          <LuHeart
            size={18}
            fill={saved ? '#290157' : 'none'}
            color={saved ? '#290157' : '#aaa'}
          />
        </button>
      </div>

      <div className={styles.mapWrap}>
        <iframe
          className={styles.map}
          loading="lazy"
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        />

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapsBtn}
        >
          <LuExternalLink size={13} />
          Open in Google Maps
        </a>
      </div>

      <div className={styles.meta}>
        <LuClock size={13} />
        <span>
          Updated <strong>{updatedMinsAgo} min ago</strong>
        </span>
      </div>

      <div className={styles.titleBlock}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.addressRow}>
          <LuMapPin size={13} />
          <span>{address}</span>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: meta.color }}>
            {trafficRating}%
          </span>
          <span className={styles.statLabel}>Traffic Rating</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: meta.color }}>
            {meta.label}
          </span>
          <span className={styles.statLabel}>Traffic Level</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statValue}>{estimatedPeople}</span>
          <span className={styles.statLabel}>Est. People</span>
        </div>
      </div>

      <div className={styles.suggestion}>
        <div className={styles.suggestionIcon}>
          <LuTriangle size={15} />
        </div>
        <div>
          <p className={styles.suggestionTitle}>Our Suggestion</p>
          <p className={styles.suggestionBody}>
            {suggestion}
          </p>
        </div>
      </div>

      <div className={styles.accordion}>
        <button
          className={styles.accordionTrigger}
          onClick={() => setHistoryOpen((o) => !o)}
        >
          <div className={styles.accordionLeft}>
            <LuActivity size={15} />
            <span>Traffic History</span>
          </div>

          <LuChevronDown />
        </button>

        {historyOpen && (
          <div className={styles.chartWrap}>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  )
}