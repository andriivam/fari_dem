import { useState, useEffect } from 'react';
import getListOfPhotos from '../../static_images/listOfImages';
import styles from './ImageCard.module.css';
import Image from 'next/image';

const ImageCard = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const query = "animals";
            const photos = await getListOfPhotos(query);
            setImages(photos);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.imgWrapper}>
            {images.map((imageUrl, index) => (
                <div key={index} className={styles.imgContainer}>
                    <Image
                        src={imageUrl || 'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDY5OTd8MXwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNjg0MTUyMzYxfDA&ixlib=rb-4.0.3&q=80&w=400'}
                        width={400}
                        height={400}
                        key={index}
                        alt={`Image ${index}`}
                        className={styles.img}
                    />
                </div>
            ))}
        </div>
    )
}

export default ImageCard