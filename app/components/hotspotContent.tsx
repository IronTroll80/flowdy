import styles from './hotspotContent.module.css';

export default function HotspotContent() {
    return (
        <>
        
        <div className  = {styles.container}>
            <div className = {styles.map}>
                <button className = {styles.mapButton}>View on Map</button>
            </div>
        </div>
        
        </>
    )
}