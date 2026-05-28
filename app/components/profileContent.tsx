import {
  LuBell,
  LuBookmark,
  LuChevronRight,
  LuDoorOpen,
  LuMapPin,
  LuMessageCircle,
  LuTrash,
} from 'react-icons/lu'

import styles from './profileContent.module.css'
import Link from 'next/link'

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
    href: '/location',
    icon: <LuMapPin size={20} />,
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
    href: '/sign-out',
    icon: <LuDoorOpen size={20} />,
    color: '#cc3333',
  },
  {
    name: 'Delete Account',
    href: '/delete-account',
    icon: <LuTrash size={20} />,
    color: '#cc3333',
  },
]

export default function ProfileContent() {
  return (
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
  )
}