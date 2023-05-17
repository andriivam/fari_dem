import styles from './notification.module.css';
import { useState } from 'react';

const Notification = () => {

    const [closed, setClosed] = useState(false);
    const handleCloseNotification = () => {
        // setClosed(!closed);
        setClosed(true)
    }

    console.log({ closed })
    if (closed) return null;

    return (
        <div className={styles.notificationContainer}>
            <div className={styles.header}></div>
            <div className={styles.notification}>
                <p>Please provide some input </p>
                <button aria-label="Close" className={styles.closeButton} onClick={handleCloseNotification}></button>
            </div>
        </div>
    )
}

export default Notification;