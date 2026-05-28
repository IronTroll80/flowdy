import { LuTrash2 } from 'react-icons/lu';
import styles from './deleteContent.module.css';
import BackButton from './goBack';

export default function DeleteAccountContent() {

    const warnings = [
    {
      text: "All your saved data will be lost along with your saved bookmarks",
      type: "danger",
    },
    {
      text: "You will be signed out of all devices right away.",
      type: "danger",
    },
    {
      text: "After 30 days, your account and all associated data will be permanently erased.",
      type: "danger",
    },
    {
      text: "You can reactivate your account any time within those 30 days by signing back in.",
      type: "success",
    },
  ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
            <BackButton />
            <h1>Delete Account</h1>
        </div>
        <div className = {styles.hero}>
            <div className={styles.icon}>
                <LuTrash2 size={20} color="#cc3333" />
            </div>
            <h3>Delete Your Account</h3>
            <p>This will begin a 30-day deletion process. Read carefully before continuing</p>
        </div>

        <div className={styles.infoContainer}>
        <h3 className={styles.title}>
            When you delete your account:
        </h3>

        <div className={styles.list}>
            {warnings.map((item, index) => (
            <div
                key={index}
                className={styles.item}
            >
                <span
                className={`${styles.dot} ${styles[item.type]}`}
                />

                <p className={styles.text}>
                {item.text}
                </p>
            </div>
            ))}
        </div>
        </div>


            <p className={styles.instruction}>Hold the button down to delete your account</p>
            <button className={styles.deleteBtn}>Delete Account</button>
            <button className={styles.cancelBtn}>Cancel</button>
        </div>
    );
}