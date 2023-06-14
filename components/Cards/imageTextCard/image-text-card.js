import styles from './ImageTextCard.module.css';
import Image from 'next/image';
import cls from 'classnames';


const ImageTextCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick, t }) => {


    return (
        <div onClick={handleSelectedInput} className={styles.container} >
            <div onClick={handlePathValueClick} className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                <div className={styles.secondColorDiv}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/image.svg"
                        alt="Fox in the show" width={420} height={225} />
                </div>
                <div className={styles.inputDiv}>
                    <h3 className={styles.exampleParagraph}>{t("Example")}</h3>
                    <div className={styles.inputArea}>
                        <p className={styles.exampleText}>{t("input")}</p>
                    </div>
                </div>
            </div>
            <div className={styles.imageTextDiv}>
                <h4 className={styles.imageTextHeader}>{t("imageText")}</h4>
            </div>
        </div>
    )
}

export default ImageTextCard;