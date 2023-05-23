import styles from './ImageInput.module.css';
import Image from 'next/image';

const ImageInput = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src="https://images.unsplash.com/photo-1578170681526-de18d598a5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80" alt="Fox in the show" width={450} height={450} />
            </div>
            <div className={styles.textDiv}>
                <p className={styles.imageParagraph}>Image</p>
            </div>
        </div>
    )
}

export default ImageInput;