import styles from './ImageText.module.css';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { PredictionContext } from '../../../context/PredictionContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { VersionContext } from '../../../context/VersionContext';
import Loading from '../../../components/Loading/loading';
import handleSubmit from '../../../handlers/submit_handler';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';


function ImageText({ submitForm, languages }) {

    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const [translatedData, setTranslatedData] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { selectedVersion } = useContext(VersionContext);
    const router = useRouter();

    const handleTextInput = (e) => {
        let textInput = e.target.value;
        setTextInput(textInput);
        const selectedObject = responseData.find(item => item.attributes.version === selectedVersion);
        if (selectedObject) {
            const inputKey = selectedObject.attributes.inputs_keys;
            if (inputKey === 'Prompt, image_path' || inputKey === 'prompt, init_image') {
                const newKeys = inputKey.split(', ');
                setGlobalInput(prevState => ({ ...prevState, [newKeys[0]]: textInput, [newKeys[1]]: globalInput.image_path || globalInput.init_image }));
            }
        };
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        console.log(prediction?.status, 'prediction status from image text page');
        if (prediction?.status === 'succeeded') {
            router.push('/result');
        }
    }, [prediction, router]);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const response = await fetchData(languages);
            setResponseData(response.data);
            const translationData = await fetchGenerativeAi(languages);
            setTranslatedData(translationData.data);
        };
        fetchDataAndUpdateState();
    }, [languages]);


    return (
        <>
            {loading ? (<Loading />) : (
                <div className={styles.container}>
                    <h3 className={styles.stepHeader}>
                        {translatedData && translatedData.attributes.step4_image_text_title}
                    </h3>
                    <p className={styles.stepParagraph}>
                        {translatedData && translatedData.attributes.step4_image_text_description}
                    </p>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>This is the image you chose</p>
                            <Image
                                className={styles.selectedImage}
                                src={globalInput.image_path || globalInput.init_image}
                                alt="picture choose by user"
                                width={500}
                                height={500} />
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>Write a short description of what the image represents</p>
                            <div className={styles.userInputDiv}>
                                <input
                                    onChange={handleTextInput}
                                    value={textInput}
                                    type="text"
                                    className={styles.input} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

// export async function getStaticProps() {

//     const data = await fetchData();

//     return {
//         props: {
//             data: data.data,
//         },
//     };
// }

export default ImageText;