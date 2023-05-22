import { useState, useEffect } from 'react';
import styles from './imageSection.module.css';
import cls from 'classnames';
import Image from 'next/image';
import Camera from '../camera/camera.js';
import getListOfPhotos from '../../static_images/listOfImages';

const ImageSection = ({ onStateChange, outputType }) => {

    const [selectedImage, setSelectedImage] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const query = outputType === 'image' ? 'winter' :
                outputType === 'video' ? 'summer' :
                    outputType === '3D' ? 'sunset' :
                        outputType === 'text' ? 'mountain' : '';
            const photos = await getListOfPhotos(query);
            setImages(photos);
        }
        fetchData();
    }, [outputType]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    }

    useEffect(() => {
        if (outputType === 'video') {
            onStateChange((prevState) => ({ ...prevState, "input_image": selectedImage }));
        } else {
            onStateChange((prevState) => ({ ...prevState, "image": selectedImage }));
        }

    }, [selectedImage]);


    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };

    if (cameraOpen) {
        return (<Camera onStateChange={onStateChange} />
        )
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.imageHeading}>Choose one of these images</h3>
            <div className={styles.imgContainer}>
                {images.map((imageUrl, index) => (
                    <Image
                        src={imageUrl || 'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDY5OTd8MXwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNjg0MTUyMzYxfDA&ixlib=rb-4.0.3&q=80&w=400'}
                        width={200}
                        height={200}
                        onClick={() => handleImageClick(imageUrl)}
                        key={index}
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






