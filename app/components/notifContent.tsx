import {
  LuCircleCheck,
  LuCircleAlert,
  LuInfo,
} from "react-icons/lu"

import BackButton from "./goBack"
import styles from "./notifContent.module.css"

export default function NotifContent() {
  const notifications = [
    {
      id: 1,
      title: "Traffic Decrease",
      description: "Traffic at Unilorin Park 1 just reduced to",
      value: "45%",
      time: "12:15 PM",
      type: "positive",
      icon: <LuCircleCheck size={18} />,
    },
    {
      id: 2,
      title: "Traffic Increase",
      description: "Traffic at Tanke Junction increased to",
      value: "89%",
      time: "1:05 PM",
      type: "negative",
      icon: <LuCircleAlert size={18} />,
    },
    {
      id: 3,
      title: "Road Update",
      description: "New road activity detected around Basin Area",
      time: "2:40 PM",
      type: "normal",
      icon: <LuInfo size={18} />,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <div>
          <h1>Notifications</h1>
          <p>Live traffic & road updates</p>
        </div>
      </div>

      <div className={styles.notifList}>
        {notifications.map((notif) => (
          <div key={notif.id} className={styles.notifCard}>

            <div className={`${styles.iconWrap} ${styles[notif.type]}`}>
              {notif.icon}
            </div>

            <div className={styles.content}>
              <div className={styles.topRow}>
                <p className={styles.title}>{notif.title}</p>
                <span className={styles.time}>{notif.time}</span>
              </div>

              <p className={styles.description}>
                {notif.description}

                {notif.value && (
                  <span className={`${styles.value} ${styles[notif.type]}`}>
                    {" "}{notif.value}
                  </span>
                )}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}