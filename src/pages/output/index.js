import styles from '../../styles/Output.module.css';
import ImageCard from '../../../components/Cards/imageCard/image-card';
import VideoCard from '../../../components/Cards/videoCard/video-card';
import DCard from '../../../components/Cards/3DCard/3d-card';
import { useContext } from 'react';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import usePathValue from '../../../handlers/path_handler';


const Output = ({ setNextPageHref }) => {


    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType, setSelectedOutputType } = useContext(OutputTypeContext);
    const { handleGetPathValue } = usePathValue();

    console.log({ selectedOutputType })
    let pathValue;

    if (selectedInputType === 'text') {
        pathValue = '/text-page';
    } else if (selectedInputType === 'image + text') {
        pathValue = '/image-text-page';
    } else if (selectedInputType === 'image') {
        pathValue = '/image-page';
    }

    const handleSelectedOutput = (outputType) => {
        setSelectedOutputType(outputType);
    };

    const handlePathValueClick = () => {
        setNextPageHref(pathValue);
        handleGetPathValue(pathValue);
    };


    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>Step 2: Transform your input </h2>
                <p className={styles.inputParagraph}>Choose what you want to transform your input into.</p>
            </div>
            <div className={styles.cartsDiv}>
                <ImageCard
                    handleSelectedOutput={() => handleSelectedOutput('image')}
                    selectedOutputType={selectedOutputType === 'image'}
                    handlePathValueClick={handlePathValueClick}
                />
                <VideoCard
                    handleSelectedOutput={() => handleSelectedOutput('video')}
                    selectedOutputType={selectedOutputType === 'video'}
                    handlePathValueClick={handlePathValueClick}
                />
                <DCard
                    handleSelectedOutput={() => handleSelectedOutput('3D')}
                    selectedOutputType={selectedOutputType === '3D'}
                    handlePathValueClick={handlePathValueClick}
                />
            </div>
        </div>
    )
}

export default Output;