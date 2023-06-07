import styles from './footer.module.css';
import cls from 'classnames';
// import { HiddenButtonContext } from '../../context/HiddenButtonContext';
// import { useContext } from 'react';

const Footer = ({ handleNextStep, disabled }) => {


    // const { fireButtonClickEvent } = useContext(HiddenButtonContext);

    const handleButtonClick = () => {
        handleNextStep();
        // fireButtonClickEvent();
    };

    return (
        <footer className={styles.footer} >
            <div className={styles.container}>
                <div className={styles.btnWrapper}>
                    <button
                        onClick={handleButtonClick}
                        disabled={disabled}
                        form="text-input"
                        type="submit"
                        className={cls(styles.nextStepBtn, { [styles.disabledBtn]: disabled })}>
                        Next Step
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer; 