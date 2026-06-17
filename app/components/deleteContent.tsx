import { LuTrash2 } from 'react-icons/lu'
import styles from './deleteContent.module.css'
import BackButton from './goBack'

export default function DeleteAccountContent() {
  const warnings = [
    {
      text: "All your saved data will be lost along with your bookmarks",
      type: "danger",
    },
    {
      text: "You will be signed out of all devices immediately",
      type: "danger",
    },
    {
      text: "After 30 days, your account and data will be permanently erased",
      type: "danger",
    },
    {
      text: "You can reactivate within 30 days by signing back in",
      type: "success",
    },
  ]

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <BackButton />
        <h1>Delete Account</h1>
      </div>

      {/* HERO WARNING CARD */}
      <div className={styles.heroCard}>
        <div className={styles.heroIcon}>
          <LuTrash2 size={18} />
        </div>

        <h2>Delete your account</h2>
        <p>
          This will start a 30-day deletion process. 
          Your data will be permanently removed after this period.
        </p>
      </div>

      {/* INFO CARD */}
      <div className={styles.infoCard}>
        <h3>What happens next</h3>

        <div className={styles.list}>
          {warnings.map((item, index) => (
            <div key={index} className={styles.item}>
              <span className={`${styles.dot} ${styles[item.type]}`} />

              <p className={styles.text}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION AREA */}
      <p className={styles.instruction}>
        Hold the button to confirm deletion
      </p>

      <button className={styles.deleteBtn}>
        Delete Account
      </button>

      <button className={styles.cancelBtn}>
        Cancel
      </button>

    </div>
  )
}