import { LuSearch, LuChevronRight, LuDoorClosed, LuSchool, LuBuilding, LuLibrary, LuHouse, LuBuilding2 } from 'react-icons/lu'
import HotspotCard, { HotspotCardProps } from './components/HotspotCard'
import styles from './components/home.module.css'
import Header from './components/header'
import BottomNav from './components/bottomNav'

// ── Mock data (swap with your API calls) ──────────────────────────────────────
const hotspots: HotspotCardProps[] = [
  {
    id: 'school-gate-park',
    name: 'School Gate Park',
    address: 'School Gate, University of Ilorin, P.M.B 1515 Ilorin',
    imageUrl: '/main-park.jpg',
    trafficRating: 88,
    trafficLevel: 'very-high',
    estimatedPeople: '120–140',
    updatedMinsAgo: 4,
  },
  {
    id: 'ps-park',
    name: 'PS Park',
    address: 'University of Ilorin Main Campus, Ilorin',
    imageUrl: '/ps-park.jpg',
    trafficRating: 45,
    trafficLevel: 'moderate',
    estimatedPeople: '40–60',
    updatedMinsAgo: 2,
  },
]

const categories = [
  { id: 'gates',      label: 'Gates',     emoji: <LuDoorClosed/> },
  { id: 'faculties',  label: 'Faculties', emoji: <LuSchool/> },
  { id: 'cafeterias', label: 'Cafeterias',emoji: <LuBuilding/> },
  { id: 'libraries',  label: 'Libraries', emoji: <LuLibrary/>},
  { id: 'hostels',    label: 'Hostels',   emoji: <LuHouse/> },
  { id: 'banks',      label: 'Banks',     emoji: <LuBuilding2 /> },
]

export default function HomePage() {
  return (
    <>
    <Header />
    <div className={styles.page}>

      {/* ── Hero banner ── */}
      <div className={styles.hero}>
        
      </div>

      {/* ── Search ── */}
      <div className={styles.searchWrap}>
        <LuSearch size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search locations…"
        />
      </div>

      {/* ── Categories ── */}
      <div className={styles.section}>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <button key={cat.id} className={styles.categoryChip}>
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              <span className={styles.categoryLabel}>{cat.label}</span>
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
          {hotspots.map((h) => (
            <HotspotCard key={h.id} {...h} />
          ))}
        </div>
      </div>

    </div>
    <BottomNav />
    </>
  )
}