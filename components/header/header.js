import Image from 'next/image';
import styles from './header.module.css';


const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.btnWrapper}>
                <button className={styles.backHomeBtn}><Image className={styles.icon} src="/static/arrow.svg" alt="arrow" width={24} height={24} />Back to homepage</button>
            </div>
            <div className={styles.btnWrapper}>
                <button className={styles.languageBtn}>EN<Image className={styles.icon} src="/static/language.svg" width={24} height={24} /></button>
                <button className={styles.helpBtn}>Help <Image className={styles.icon} src="/static/question.svg" width={24} height={24} /></button>
            </div>
        </div>
    )
}

export default Header;