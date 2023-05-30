import styles from './VideoCard.module.css';
import Image from 'next/image';
import cls from 'classnames';
import usePathValue from '../../../handlers/path_handler';


const VideoCard = ({ handleSelectedOutput, selectedOutputType, handlePathValueClick }) => {

    // const { handleGetPathValue } = usePathValue();

    // const handleItemClick = (pathValue) => {
    //     handleGetPathValue(pathValue);
    //     handlePathValueClick(pathValue);
    // };

    return (
        <div onClick={handleSelectedOutput} className={styles.container}>
            <div
                // onClick={() => handleItemClick('/image-page')}
                className={cls(styles.iconContainer, { [styles.selected]: selectedOutputType })}>
                <div className={styles.secondColorDiv}>
                    <Image
                        className={styles.image}
                        src="/static/video.svg"
                        alt="Fox in the show" width={420} height={365} />
                    {selectedOutputType && <div className={styles.imgWrapper}><img className={styles.icon} src="/static/check.svg" alt="Selected Icon" /></div>}
                </div>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>Video</p>
            </div>
        </div>
    )
}

export default VideoCard;