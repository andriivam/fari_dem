import styles from '../../styles/Output.module.css';
import ImageCard from '../../../components/Cards/imageCard/image-card';
import VideoCard from '../../../components/Cards/videoCard/video-card';
import DCard from '../../../components/Cards/3DCard/3d-card';
import { useState } from 'react';

const Output = () => {

    const [selectedOutputType, setSelectedOutputType] = useState(null);

    const handleSelectedOutput = (outputType) => {
        setSelectedOutputType(outputType);
    };

    console.log({ selectedOutputType })

    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>Step 3: Transform your input </h2>
                <p className={styles.inputParagraph}>Choose what you want to transform your input into.</p>
            </div>
            <div className={styles.cartsDiv}>
                <ImageCard
                    setSelectedOutputType={setSelectedOutputType}
                />
                <VideoCard
                    handleSelectedOutput={() => handleSelectedOutput('video')}
                    selectedOutputType={selectedOutputType === 'video'}
                />
                <DCard
                    handleSelectedOutput={() => handleSelectedOutput('3D')}
                    selectedOutputType={selectedOutputType === '3D'}
                />
            </div>
        </div>
    )
}

export default Output;