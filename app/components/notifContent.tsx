import {
  LuArrowDownUp,
  LuCircleCheck,
  LuCircleAlert,
  LuInfo,
} from "react-icons/lu";

import BackButton from "./goBack";
import styles from "./notifContent.module.css";

export default function NotifContent() {

  const notifications = [
    {
      id: 1,
      title: "Traffic Decrease",
      description: "Traffic at Unilorin Park 1 just reduced to",
      percentage: '45%',
      time: "12:15 PM",
      type: "positive",
      icon: <LuCircleCheck size={20} />,
    },

    {
      id: 2,
      title: "Traffic Increase",
      description: "Traffic at Tanke Junction increased to",
      percentage: '89%',
      time: "1:05 PM",
      type: "negative",
      icon: <LuCircleAlert size={20} />,
    },

    {
      id: 3,
      title: "Road Update",
      description: "New road activity detected around Basin Area",
      time: "2:40 PM",
      type: "normal",
      icon: <LuInfo size={20} />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <h1>Notifications</h1>
      </div>

      <div className={styles.notifList}>

        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={styles.notifItem}
          >

            <div
              className={`${styles.notifIcon} ${styles[notif.type]}`}
            >
              {notif.icon}
            </div>

            <div className={styles.notifText}>
              <p className={styles.notifTitle}>
                {notif.title}
              </p>

              <p className={styles.notifDescription}>
                {notif.description}
                <span className = {notif.type === 'positive' ? styles.positiveText : notif.type === 'negative' ? styles.negativeText : ''}>
                  {notif.percentage ? ` ${notif.percentage}` : ''}
                </span>
              </p>
            </div>

            <p className={styles.notifTime}>
              {notif.time}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}