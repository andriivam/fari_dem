import styles from '../../styles/ImagePage.module.css';
import ImageList from '../../../components/ImageList/image-list';
import Camera from '../../../components/camera/camera';
import { useState, useContext, useEffect, use } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { VersionContext } from '../../../context/VersionContext';
import handleSubmit from '../../../handlers/submit_handler';
import { PredictionContext } from '../../../context/PredictionContext';
import Loading from '../../../components/Loading/loading';
import { useRouter } from 'next/router';
import usePathValue from '../../../handlers/path_handler';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';


const ImagePage = ({ setNextPageHref, submitForm, setSubmitForm, languages }) => {

    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [translation, setTranslation] = useState(null);
    const [data, setData] = useState(null);


    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { selectedVersion } = useContext(VersionContext);

    const { handleGetPathValue } = usePathValue();

    const router = useRouter();

    const handleCameraOpen = (e) => {
        e.preventDefault();
        setCameraOpen(true);
    };


    const handleImageUrl = async (imageUrl, e) => {
        setSelectedImage(imageUrl);
        e.preventDefault();
        const selectedObject = data.data.find(item => item.attributes.version === selectedVersion);
        if (selectedObject) {
            const inputKey = selectedObject.attributes.inputs_keys;
            if (inputKey === 'Prompt, image_path' || inputKey === 'prompt, init_image') {
                const newKeys = inputKey.split(', ');
                setGlobalInput(prevState => ({ ...prevState, [newKeys[0]]: '', [newKeys[1]]: imageUrl }));
            } else {
                setGlobalInput(prevState => ({ ...prevState, [inputKey]: imageUrl }));
            }
        };
    };

    useEffect(() => {
        if (selectedInputType === 'image + text') {
            const handlePathValueClick = (pathValue) => {
                handleGetPathValue(pathValue);
                setNextPageHref(pathValue);
            };
            if (submitForm) {
                setSubmitForm(false);
            }
            handlePathValueClick('/image-text');
        }
    }, [selectedInputType, handleGetPathValue, setNextPageHref]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (selectedInputType === 'image + text') {
            setLoading(false);
            return; // Return early if selectedInputType is "image + text"
        }
        try {
            await handleSubmit(
                e,
                globalInput,
                setPrediction,
                setError,
                error,
                selectedVersion,
                selectedInputType,
                selectedOutputType)
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (submitForm) {
            handleSubmitForm({ preventDefault: () => { } });
        }
    }, [submitForm]);


    useEffect(() => {
        //console.log(prediction?.status, 'prediction status from image page');
        if (prediction?.status === 'succeeded') {
            router.push('/result');
        }
    }, [prediction, router]);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const data = await fetchData(languages);
            setData(data);
            const translatedData = await fetchGenerativeAi(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={styles.container}>
                    <div className={styles.headingInfo}>
                        <h2 className={styles.header}>
                            {translation && translation.data.attributes.step3_image_title}
                        </h2>
                        <p className={styles.inputParagraph}>
                            {translation && translation.data.attributes.step3_image_description}
                        </p>
                    </div>
                    {cameraOpen ? (<Camera
                        handleImageUrl={handleImageUrl}
                    />) : (
                        <>
                            <h4 className={styles.imageHeading}>
                                Choose one of these images
                            </h4>
                            <div className={styles.content} >
                                <ImageList
                                    handleImageUrl={handleImageUrl}
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
            )}
        </>

    )
}

export default ImagePage;