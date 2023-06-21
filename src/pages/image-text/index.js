import styles from './ImageText.module.css';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { useContext } from 'react';
import Image from 'next/image';


function ImageText() {



    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);

    return (
        <div className={styles.container}>
            <h3 className={styles.stepHeader}>Step 4: Describe your image</h3>
            <p className={styles.stepParagraph}>Write a short description of what the image represents.</p>
            <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                    <p className={styles.inputHeader}>This is the image you chose</p>
                    <Image className={styles.selectedImage} src={globalInput.image} alt="animal" width={500} height={500} />
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.inputHeader}>Write a short description of what the image represents</p>
                    <div className={styles.userInputDiv}>
                        <input type="text" className={styles.input} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageText;