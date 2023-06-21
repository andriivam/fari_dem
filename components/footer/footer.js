import styles from './footer.module.css';
import cls from 'classnames';
import { useRouter } from 'next/router';

const Footer = ({ handleNextStep, disabled, onSubmit }) => {

    const router = useRouter();

    const handleButtonClick = (e) => {
        handleNextStep();
        e.preventDefault();
        if (router.pathname === '/image-page'
            || router.pathname === '/text-page'
            || router.pathname === '/image-text-page') {
            onSubmit();
        }
    };

    return (
        <footer className={styles.footer} >
            <div className={styles.container}>
                <div className={styles.btnWrapper}>
                    <button
                        onClick={handleButtonClick}
                        disabled={disabled}
                        className={cls(styles.nextStepBtn, { [styles.disabledBtn]: disabled })}>
                        Next Step
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer; 