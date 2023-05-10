import { useState } from 'react';
import styles from './imageSection.module.css';
import cls from 'classnames';
import Image from 'next/image';
import Camera from './camera.js';


const images = [
    'https://images.unsplash.com/photo-1577717707588-58e49821e851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1682968356839-e72de61bd076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1682795176020-1752b4446818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1713&q=80',
    'https://images.unsplash.com/photo-1682801008786-31abd2329712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
];

const ImageSection = () => {

    const [selectedImage, setSelectedImage] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false);


    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        console.log(selectedImage, 'selectedImage')
    };

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    }

    if (cameraOpen) {
        return (<Camera />
        )
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.imageHeading}>Choose one of these images</h3>
            <div className={styles.imgContainer}>
                {images.map((imageUrl, index) => (
                    <img
                        onClick={() => handleImageClick(imageUrl)}
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className={cls(styles.img, { [styles.selected]: selectedImage === imageUrl })}
                    />
                ))}
            </div>
            <p className={styles.imageParagraph}>Or</p>
            <div className={styles.cameraDiv}>
                <button className={styles.cameraBtn} onClick={handleCameraOpen}><Image src="/static/camera.svg" alt="camera" width={60} height={55} /></button>
                <p className={styles.cameraPar}>Click here to take a picture using webcam</p>
            </div>
        </div>
    );
};

export default ImageSection;






