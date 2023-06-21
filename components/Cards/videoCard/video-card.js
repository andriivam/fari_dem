import styles from './VideoCard.module.css';
import Image from 'next/image';
import cls from 'classnames';


const VideoCard = ({ handleSelectedOutput, selectedOutputType, handlePathValueClick, task }) => {

    return (
        <div onClick={handleSelectedOutput} className={styles.container}>
            <div
                onClick={handlePathValueClick}
                className={cls(styles.iconContainer, { [styles.selected]: selectedOutputType })}>
                <div className={styles.secondColorDiv}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/video.svg"
                        alt="Fox in the show" width={420} height={365} />
                </div>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>{task}</p>
            </div>
        </div>
    )
}

export default VideoCard;