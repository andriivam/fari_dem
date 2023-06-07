import styles from './3DCard.module.css';
import Image from 'next/image';
import cls from 'classnames';



const DCard = ({ handleSelectedOutput, selectedOutputType, handlePathValueClick }) => {


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
                        alt="Fox in the show" width={420} height={365} />
                    {selectedOutputType && <div className={styles.imgWrapper}><img className={styles.icon} src="/static/check.svg" alt="Selected Icon" /></div>}
                </div>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>3D</p>
            </div>
        </div>
    )
}

export default DCard;