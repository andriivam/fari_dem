import styles from '../../styles/TextPage.module.css';

const TextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.stepHeader}>Step 2: Write your text</h2>
                <p className={styles.inputParagraph}>Write a text describing the image you would like to be created by the algorithm.</p>
            </div>
            <div className={styles.textArea}>
                <h3 className={styles.inputHeader}>Describe your image (max 100 characters)</h3>
                <div className={styles.inputWrapper}>
                    <input id="user" className={styles.input} type="text" placeholder="Write your prompt here" />
                </div>
            </div>
        </div>
    )
}

export default TextPage;