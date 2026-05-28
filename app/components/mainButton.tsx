import styles from "./mainButton.module.css";

interface Props {
    title: string;
    onClick?: ()=> void
}

export default function MainButton ({title, onClick}: Props) {
    return(
        <>
        
        <button type="submit" className={styles.button} onClick={onClick}>
            {title}
        </button>
        
        
        </>
    )
}