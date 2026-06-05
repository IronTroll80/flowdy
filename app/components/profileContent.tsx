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

const campuses = [
  { id: 'unilorin', name: 'University of Ilorin', short: 'UNILORIN' },
]

export default function ProfileContent() {
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [selectedCampus, setSelectedCampus] = useState('')
  const [detecting, setDetecting] = useState(false)

  const handleDetect = () => {
    setDetecting(true)
    // TODO: wire up real geolocation
    setTimeout(() => {
      setDetecting(false)
      setSelectedCampus('unilorin')
    }, 1500)
  }

  const handleSignOut = () => {
    // TODO: call your sign-out logic here
    setSignOutOpen(false)
  }

  const handleLocationConfirm = () => {
    // TODO: persist selectedCampus
    setLocationOpen(false)
  }

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
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>

        <div className={styles.profileInfo}>
          <p className={styles.infoName}>John Doe</p>
          <p className={styles.infoEmail}>john.doe@example.com</p>
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
      </div>

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