import styles from './footer.module.css';

const Footer = ({ handleSubmit, handleReset }) => {

    return (
        <footer className={styles.container}>
            <div className={styles.resetWrapper}>
                <button className={styles.resetBtn} onClick={handleReset} >Reset</button>
            </div>
            <div className={styles.submitWrapper}>
                <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
            </div>
        </footer>
    )
}

export default Footer;