import styles from '../../styles/ImagePage.module.css';
import ImageList from '../../../components/ImageList/image-list';
import Camera from '../../../components/camera/camera';
import { useState, useContext } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import usePathValue from '../../../handlers/path_handler';
import getVersion from '../../../functions/set-version';
import handleSubmit from '../../../handlers/submit_handler';
import { PredictionContext } from '../../../context/PredictionContext';

const ImagePage = ({ setNextPageHref }) => {

    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState(null);

    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { handleGetPathValue } = usePathValue();

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };

    const handlePathValueClick = (pathValue) => {
        setNextPageHref(pathValue);
        handleGetPathValue(pathValue);
    };

    const handleImageClick = (imageUrl, e) => {
        setSelectedImage(imageUrl);
        setGlobalInput(prevState => ({ ...prevState, "image": imageUrl }));
        // console.log(getVersion(selectedInputType, selectedOutputType), 'version check from image page')
        // handlePathValueClick('/result');
    }

    //handleSubmit(e, globalInput, setPrediction, setError, error, selectedInputType, selectedOutputType);



    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>Step 3: Choose your image</h2>
                <p className={styles.inputParagraph}> Select one of the proposed images or take a picture with the webcam.</p>
            </div>
            {cameraOpen ? (<Camera setNextPageHref={setNextPageHref} />) : (
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
            {prediction && <p>status: {prediction.status}</p>}
        </div>
    )
}

export default ImagePage;