import styles from './3DCard.module.css';
import Image from 'next/image';
import cls from 'classnames';



const DCard = ({ handleSelectedOutput, selectedOutputType, handlePathValueClick, task }) => {


    return (
        <div onClick={handleSelectedOutput} className={styles.container}>
            <div
                onClick={() => handlePathValueClick()}
                className={cls(styles.iconContainer, { [styles.selected]: selectedOutputType })}>
                <div className={styles.secondColorDiv}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/cube.svg"
                        alt="Fox in the show" width={420} height={345} />
                </div>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>{task}</p>
            </div>
        </div>
    )
}

export default DCard;