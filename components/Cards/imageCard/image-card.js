import styles from './ImageCard.module.css';
import Image from 'next/image';
import cls from 'classnames';
import usePathValue from '../../../handlers/path_handler';


const ImageCard = ({ handleSelectedInput, selectedInputType, handlePathValueClick }) => {

    const { handleGetPathValue } = usePathValue();

    const handleItemClick = (pathValue) => {
        handleGetPathValue(pathValue);
        handlePathValueClick(pathValue);
    };

    return (
        <div onClick={handleSelectedInput} className={styles.container}>
            <div onClick={() => handleItemClick('/output')} className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
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