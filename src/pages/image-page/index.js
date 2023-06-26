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
import { fetchData } from '../../../api/axios';


const ImagePage = ({ setNextPageHref, submitForm, setSubmitForm, t, data }) => {

    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


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
        const selectedObject = data.find(item => item.attributes.version === selectedVersion);
        if (selectedObject) {
            const inputKey = selectedObject.attributes.inputs_keys;
            console.log(inputKey, 'inputKey from image page');
            if (inputKey === 'Prompt, image_path' || inputKey === 'prompt, init_image') {
                const newKeys = inputKey.split(', ');
                console.log(newKeys, 'newKeys from image page');
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
        console.log('handler was submitted')
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
                        <h2 className={styles.header}>{t("Step3")}</h2>
                        <p className={styles.inputParagraph}>{t("Step3_paragraph")}</p>
                    </div>
                    {cameraOpen ? (<Camera
                        handleImageUrl={handleImageUrl}
                    />) : (
                        <>
                            <h4 className={styles.imageHeading}>{t("Step3_img_header")}</h4>
                            <div className={styles.content} >
                                <ImageList
                                    handleImageUrl={handleImageUrl}
                                    selectedImage={selectedImage}
                                />
                                <p className={styles.middleParagraph}>Or</p>
                                <div className={styles.cameraDivWrapper}>
                                    <div className={styles.cameraDiv}>
                                        <button className={styles.cameraBtn} onClick={handleCameraOpen}><Image src="/static/camera.svg" alt="camera" width={60} height={55} /></button>
                                        <p className={styles.cameraPar}>{t("Camera_header")}</p>
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

export async function getStaticProps() {

    const data = await fetchData();

    return {
        props: {
            data: data.data,
        },
    };
}


export default ImagePage;