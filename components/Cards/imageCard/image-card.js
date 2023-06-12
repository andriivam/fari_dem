import styles from './ImageCard.module.css';
import Image from 'next/image';
import cls from 'classnames';
import { useTranslation } from 'next-i18next';



const ImageCard = ({ handleSelectedInput, handlePathValueClick, handleSelectedOutput, selectedInputType, selectedOutputType }) => {


    const { t } = useTranslation('common');

    const handleInputOutputClick = (event) => {
        event.stopPropagation();
        if (handleSelectedInput) {
            handleSelectedInput();
        } else if (handleSelectedOutput) {
            handleSelectedOutput();
        }
    }

    const iconContainerClasses = cls(styles.iconContainer, {
        [styles.selectedInput]: selectedInputType,
        [styles.selectedOutput]: selectedOutputType
    });


    return (
        <div onClick={handleInputOutputClick}
            className={styles.container}>
            <div onClick={handlePathValueClick} className={iconContainerClasses}>
                <div className={styles.secondColorDiv}>
                    <Image
                        className={styles.image}
                        priority={true}
                        src="/static/image.svg"
                        alt="Fox in the show" width={420} height={365} />
                    {selectedInputType && <div className={styles.imgWrapper}></div>}
                </div>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>{t("Image")}</p>
            </div>
        </div>
    )
}


export default ImageCard;
