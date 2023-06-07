import styles from '../../styles/ImagePage.module.css';
import ImageList from '../../../components/ImageList/image-list';
import Camera from '../../../components/camera/camera';
import { useState, useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import handleSubmit from '../../../handlers/submit_handler';
import { PredictionContext } from '../../../context/PredictionContext';
import Loading from '../../../components/Loading/loading';
import { useRouter } from 'next/router';
import { HiddenButtonContext } from '../../../context/HiddenButtonContext';



const ImagePage = ({ setNextPageHref }) => {

    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);

    const { setButtonClickHandler } = useContext(HiddenButtonContext);
    const mountedRef = useRef(true)


    const router = useRouter();

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };

    // const handlePathValueClick = (pathValue) => {
    //     setNextPageHref(pathValue);
    //     handleGetPathValue(pathValue);
    // };

    const handleImageClick = (imageUrl, e) => {
        setSelectedImage(imageUrl);
        e.preventDefault();
        if (selectedOutputType === 'video') {
            setGlobalInput(prevState => ({ ...prevState, "input_image": imageUrl }));
        } else {
            setGlobalInput(prevState => ({ ...prevState, "image": imageUrl }));
        }
    }

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('handler was submitted')
        try {
            await handleSubmit(
                e,
                globalInput,
                setPrediction,
                setError,
                error,
                selectedInputType,
                selectedOutputType)
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }


    // useEffect(() => {
    //     if (setButtonClickHandler && mountedRef.current) {
    //         // Create a mock event object with a preventDefault function
    //         handleSubmitImage({ preventDefault: () => { } });
    //     }
    // }, [setButtonClickHandler, mountedRef]);

    useEffect(() => {
        console.log(prediction?.status, 'prediction status from image page');
        if (prediction?.status === 'succeeded') {
            router.push('/result');
        }
    }, [prediction, router]);

    return (

        <>
            {loading ? (
                <Loading />
            ) : (
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
                                <button onClick={handleSubmitImage}>Test Submit </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>

    )
}

export default ImagePage;