import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


const Header = ({ setNextPageHref }) => {

    const router = useRouter();

    const handleResetPathValue = (pathValue) => {
        setNextPageHref(pathValue);
    };

    const handlePreviousStep = () => {
        router.back(); // Navigate to the previous page
    };


    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <button onClick={handlePreviousStep} className={styles.previousBtn}><Image className={styles.icon} src="/static/arrow-back.svg" alt="arrow" width={24} height={24} />Previous</button>
            </div>
            <div className={styles.btnContainer}>
                <div className={styles.btnWrapper}>
                    <Link className={styles.link} href="/">
                        <button onClick={() => handleResetPathValue(null)} className={styles.homeBtn}>
                            <Image className={styles.icon} alt="house" src="/static/home.svg" width={24} height={24} />
                            Home
                        </button>
                    </Link>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.languageBtn}>
                        <Image className={styles.icon} alt="earth" src="/static/language.svg" width={24} height={24} />
                        EN
                    </button>
                </div>
                <div className={styles.btnWrapper}></div>

                <button className={styles.helpBtn}>
                    <Image className={styles.icon} alt="question mark" src="/static/question.svg" width={24} height={24} />
                    Help
                </button>
            </div>
        </div>
    )
}

export default Header;