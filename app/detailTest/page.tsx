'use client'

import { useState, useRef, useEffect } from 'react'
import {
  LuArrowLeft,
  LuMapPin,
  LuClock,
  LuChevronDown,
  LuExternalLink,
  LuUsers,
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
import styles from '../components/hotspotDetail.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

// ── Types ────────────────────────────────────────────────────────────────────
type TrafficLevel = 'low' | 'moderate' | 'high' | 'very-high'

interface HotspotDetailProps {
  name?: string
  address?: string
  imageUrl?: string
  trafficRating?: number
  trafficLevel?: TrafficLevel
  estimatedPeople?: string
  updatedMinsAgo?: number
  lat?: number
  lng?: number
}

const levelMeta: Record<TrafficLevel, { label: string; color: string }> = {
  low:         { label: 'Low',       color: '#22c55e' },
  moderate:    { label: 'Moderate',  color: '#f59e0b' },
  high:        { label: 'High',      color: '#ef4444' },
  'very-high': { label: 'Very High', color: '#cc3333' },
}

// ── Mock history data ─────────────────────────────────────────────────────────
const historyLabels = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', 'Now']
const historyData   = [12, 28, 55, 82, 88, 76, 60, 45, 88]

export default function HotspotDetail({
  name             = 'School Gate Park',
  address          = 'School Gate, University of Ilorin, P.M.B 1515 Ilorin',
  imageUrl         = '/images/school-gate.jpg',
  trafficRating    = 88,
  trafficLevel     = 'very-high',
  estimatedPeople  = '120–140',
  updatedMinsAgo   = 4,
  lat              = 8.4799,
  lng              = 4.5418,
}: HotspotDetailProps) {
  const [historyOpen, setHistoryOpen] = useState(false)
  const meta = levelMeta[trafficLevel]

  // Chart config
  const chartData = {
    labels: historyLabels,
    datasets: [
      {
        data: historyData,
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
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { size: 10, family: 'DM Sans, sans-serif' }, color: '#bbb' },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: '#f0f0f0' },
        border: { display: false },
        ticks: {
          font: { size: 10, family: 'DM Sans, sans-serif' },
          color: '#bbb',
          callback: (v) => `${v}%`,
          stepSize: 25,
        },
      },
    },
  }

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

  return (
    <div className={styles.page}>

      {/* ── Back header ── */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.back}>
          <LuArrowLeft size={20} />
        </Link>
        <p className={styles.topTitle}>Hotspot Detail</p>
        <div style={{ width: 32 }} />
      </div>

      {/* ── Map embed ── */}
      <div className={styles.mapWrap}>
        <iframe
          className={styles.map}
          loading="lazy"
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          title="Location map"
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

      {/* ── Meta row ── */}
      <div className={styles.meta}>
        <LuClock size={13} className={styles.metaIcon} />
        <span>Updated <strong>{updatedMinsAgo} min ago</strong></span>
      </div>

      {/* ── Name + address ── */}
      <div className={styles.titleBlock}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.addressRow}>
          <LuMapPin size={13} className={styles.metaIcon} />
          <span>{address}</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: meta.color }}>
            {trafficRating}%
          </span>
          <span className={styles.statLabel}>Traffic Rating</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: meta.color }}>
            {meta.label}
          </span>
          <span className={styles.statLabel}>Traffic Level</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statCard}>
          <span className={styles.statValue}>{estimatedPeople}</span>
          <span className={styles.statLabel}>Est. People</span>
        </div>
      </div>

      {/* ── Suggestion card ── */}
      <div className={styles.suggestion}>
        <div className={styles.suggestionIcon}>
          <LuTriangle size={15} />
        </div>
        <div>
          <p className={styles.suggestionTitle}>Our Suggestion</p>
          <p className={styles.suggestionBody}>
            Area is busy right now. Consider waiting 20–30 min or finding
            alternative routes to avoid queuing.
          </p>
        </div>
      </div>

      {/* ── Traffic History accordion ── */}
      <div className={styles.accordion}>
        <button
          className={styles.accordionTrigger}
          onClick={() => setHistoryOpen((o) => !o)}
        >
          <div className={styles.accordionLeft}>
            <LuActivity size={15} />
            <span>Traffic History</span>
          </div>
          <LuChevronDown
            size={16}
            className={`${styles.accordionChevron} ${historyOpen ? styles.accordionChevronOpen : ''}`}
          />
        </button>

        {historyOpen && (
          <div className={styles.chartWrap}>
            <p className={styles.chartLabel}>Today's traffic rating (% by hour)</p>
            <div className={styles.chartCanvas}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
