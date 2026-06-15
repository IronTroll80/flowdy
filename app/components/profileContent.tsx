'use client'

import { useState } from 'react'
import {
  LuBell,
  LuBookmark,
  LuChevronRight,
  LuDoorOpen,
  LuMapPin,
  LuMessageCircle,
  LuNavigation,
  LuTrash,
} from 'react-icons/lu'

import styles from './profileContent.module.css'
import Link from 'next/link'
import LocationModal from './locationModal'

import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfileContent() {
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  

  const handleSignOut = async () => {
    await supabase.auth.signOut()

    setSignOutOpen(false)

    router.push('/login')
  }

  const { user, loading } = useAuth()
  const router = useRouter()

    useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const links = [
    {
      name: 'Notifications',
      href: '/notifications',
      icon: <LuBell size={20} />,
    },
    {
      name: 'Saved Hotspots',
      href: '/saved',
      icon: <LuBookmark size={20} />,
    },
    {
      name: 'Location',
      href: '#',
      icon: <LuMapPin size={20} />,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        setLocationOpen(true)
      },
    },
    {
      name: 'Contact Us',
      href: '/contact',
      icon: <LuMessageCircle size={20} />,
    },
  ]

  const redLinks = [
    {
      name: 'Sign Out',
      href: '#',
      icon: <LuDoorOpen size={20} />,
      color: '#cc3333',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        setSignOutOpen(true)
      },
    },
    {
      name: 'Delete Account',
      href: '/delete-account',
      icon: <LuTrash size={20} />,
      color: '#cc3333',
    },
  ]

  return (
    <>

      {loading ? (
        <div className="w-full h-48 bg-muted animate-pulse rounded-xl" />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>Profile</h1>

        <div className={styles.profileInfo}>
          <p className={styles.infoName}>
            {user?.email?.split('@')[0] || 'Guest'}
          </p>
          <p className={styles.infoEmail}>
            {user?.email || 'Not signed in'}
          </p>
        </div>

        <div className={styles.profileButtons}>
          <div className={styles.linksContainer}>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={styles.link}
                onClick={link.onClick}
              >
                <div className={styles.linkLeft}>
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <LuChevronRight size={20} />
              </Link>
            ))}
          </div>

          <hr className={styles.hr} />

          <div className={styles.linksContainer}>
            {redLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={styles.link}
                style={{ color: link.color }}
                onClick={link.onClick}
              >
                <div className={styles.linkLeft}>
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <LuChevronRight size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>)}

      {/* ── Sign Out Modal ── */}
      {signOutOpen && (
        <div className={styles.overlay} onClick={() => setSignOutOpen(false)}>
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drag} />

            <div className={styles.iconWrap}>
              <LuDoorOpen size={24} />
            </div>

            <p className={styles.sheetTitle}>Sign out?</p>
            <p className={styles.sheetSub}>
              You'll need to sign in again to access your account.
            </p>

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={() => setSignOutOpen(false)}>
                Cancel
              </button>
              <button className={styles.confirmRed} onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Location Modal ── */}
      {locationOpen && (
        <LocationModal isOpen = {true} onClose={()=>{setLocationOpen(false)}} onSelect={()=>{}} currentCampus='unilorin'/>
      )}
    </>
  )
}