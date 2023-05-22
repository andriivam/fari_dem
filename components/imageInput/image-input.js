import styles from './ImageInput.module.css';
import Image from 'next/image';

const ImageInput = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src="https://plus.unsplash.com/premium_photo-1664303877925-2a582c551c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80" alt="Fox in the show" width={450} height={450} />
                </div>
                <div className={styles.btnDiv}>
                    <button className={styles.btn}>Image</button>
                </div>
            </div>

        </div>
    )
}

export default ImageInput;