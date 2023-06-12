import { useState, useEffect } from 'react';
import getListOfPhotos from '../../static_images/listOfImages';
import styles from './ImageList.module.css';
import Image from 'next/image';
import cls from 'classnames';


const ImageList = ({ handleImageUrl, selectedImage }) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const query = "animals";
            const photos = await getListOfPhotos(query);
            setImages(photos);
        }
        fetchData();
    }, []);

    const handleClick = (imageUrl, e) => {
        handleImageUrl(imageUrl, e);
    }

    return (
        <div className={styles.imgWrapper}>
            {images.map((imageUrl, index) => (
                <div key={index} className={styles.imgContainer}>
                    <Image
                        src={imageUrl || 'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDY5OTd8MXwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNjg0MTUyMzYxfDA&ixlib=rb-4.0.3&q=80&w=400'}
                        width={430}
                        height={375}
                        key={index}
                        alt={`Image ${index}`}
                        onClick={(e) => handleClick(imageUrl, e)}
                        className={cls(styles.img, { [styles.selected]: selectedImage === imageUrl })}
                    />
                </div>
            ))}
        </div>
    )
}

export default ImageList