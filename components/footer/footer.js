import styles from './footer.module.css';
import cls from 'classnames';

const Footer = ({ handleNextStep, disabled }) => {

    return (
        <footer className={styles.footer} >
            <div className={styles.container}>
                <div className={styles.btnWrapper}>
                    <button onClick={handleNextStep} disabled={disabled} className={cls(styles.nextStepBtn, { [styles.disabledBtn]: disabled })}>Next Step</button>
                </div>
            </div>

        </footer>
    )
}

export default Footer; 