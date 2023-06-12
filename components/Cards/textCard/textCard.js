import styles from './TextCard.module.css';
import cls from 'classnames';
import { useTranslation } from 'next-i18next';

const TextCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick }) => {

    const { t } = useTranslation('common');
    return (
        <div onClick={handleSelectedInput} className={styles.container}>
            <div
                onClick={handlePathValueClick}
                className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                <h3 className={styles.exampleHeader}>{t("Example:")}</h3>
                <div className={styles.secondColorDiv}>
                    <p className={styles.exampleText}>
                        {t("exampleText")}
                    </p>
                </div>
            </div>
            <div className={styles.headerDiv}>
                <p className={styles.textHeader}>{t("Text")}</p>
            </div>
        </div>
    )
}

export default TextCard;