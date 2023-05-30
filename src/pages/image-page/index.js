import styles from '../../styles/ImagePage.module.css';
import ImageCard from '../../../components/ImageCard/image-card';
import Camera from '../../../components/camera/camera';
import { useState } from 'react';
import Image from 'next/image';

const ImagePage = () => {
    const [cameraOpen, setCameraOpen] = useState(false);

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };


    if (cameraOpen) {
        return (<Camera />
        )
    };

    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>Step 2: Choose your image</h2>
                <p className={styles.inputParagraph}> Select one of the proposed images or take a picture with the webcam. Then describe the image you chose.</p>
            </div>
            <h4 className={styles.imageHeading}> Choose one of these images</h4>
            <div className={styles.content} >
                <div className={styles.imagesList}>
                    <ImageCard />
                </div>
                <p className={styles.middleParagraph}>Or</p>
                <div className={styles.cameraDivWrapper}>
                    <div className={styles.cameraDiv}>
                        <button className={styles.cameraBtn} onClick={handleCameraOpen}><Image src="/static/camera.svg" alt="camera" width={60} height={55} /></button>
                        <p className={styles.cameraPar}>Click here to take a picture using webcam</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImagePage;