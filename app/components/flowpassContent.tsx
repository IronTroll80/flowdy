import styles from './flowPassContent.module.css'

export default function FlowPassContent() {
    return(
        <>
        
        <div className={styles.container}>
            <h1 className={styles.title}>FlowPass</h1>
            <p className={styles.description}>
                Secure Your Transport Before You Leave Home.
            </p>
            <div className = {styles.tease}>
                Coming Soon...
            </div>
            <div className={styles.waitlist}>
                <div>Notify Me</div>
            </div>
        </div>
        
        </>
    )
}