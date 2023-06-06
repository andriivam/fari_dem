import styles from '../../styles/ImageText.module.css';
import ImageList from '../../../components/ImageList/image-list';
import Camera from '../../../components/camera/camera';
import { useState } from 'react';
import Image from 'next/image';

const ImageTextPage = () => {

    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    }

    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>Step 3: Choose your image</h2>
                <p className={styles.inputParagraph}> Select one of the proposed images or take a picture with the webcam. Then describe the image you chose.</p>
            </div>
            {cameraOpen ? (<Camera />) : (
                <>
                    <h4 className={styles.imageHeading}> Choose one of these images</h4>
                    <div className={styles.content} >
                        <ImageList
                            handleImageClick={handleImageClick}
                            selectedImage={selectedImage}
                        />
                        <p className={styles.middleParagraph}>Or</p>
                        <div className={styles.cameraDivWrapper}>
                            <div className={styles.cameraDiv}>
                                <button className={styles.cameraBtn} onClick={handleCameraOpen}><Image src="/static/camera.svg" alt="camera" width={60} height={55} /></button>
                                <p className={styles.cameraPar}>Click here to take a picture using webcam</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ImageTextPage;