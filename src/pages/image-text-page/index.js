import styles from '../../styles/ImagePage.module.css';
const ImagePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>Step 2: Choose your image and describe it</h2>
                <p className={styles.inputParagraph}> Select one of the proposed images or take a picture with the webcam. Then describe the image you chose.</p>
            </div>

        </div>
    )
}

export default ImagePage;