import styles from './footer.module.css';
import cls from 'classnames';
import { FormContext } from '../../context/FormContext';
import { useContext } from 'react';

const Footer = ({ handleNextStep, disabled }) => {

    const { handleSubmitForm } = useContext(FormContext);


    const handleButtonClick = () => {
        handleSubmitForm();
        handleNextStep();
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