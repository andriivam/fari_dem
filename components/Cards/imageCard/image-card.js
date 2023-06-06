import styles from './ImageCard.module.css';
import Image from 'next/image';
import cls from 'classnames';



const ImageCard = ({ handleSelectedInput, handlePathValueClick, handleSelectedOutput, selectedInputType, selectedOutputType }) => {

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
                        src="/static/image.svg"
                        alt="Fox in the show" width={420} height={365} />
                    {selectedInputType && <div className={styles.imgWrapper}><img className={styles.icon} src="/static/check.svg" alt="Selected Icon" /></div>}
                </div>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>Image</p>
            </div>
        </div>
    )
}

export default ImageCard;