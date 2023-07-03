import styles from '../../styles/TextPage.module.css';
import { useState, useContext, useEffect } from 'react';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { VersionContext } from '../../../context/VersionContext';
import handleSubmit from '../../../handlers/submit_handler';
import Loading from '../../../components/Loading/loading';
import { PredictionContext } from '../../../context/PredictionContext';
import { LinkContext } from '../../../context/LinkContext';
import { useRouter } from 'next/router';
import { fetchGenerativeAi, fetchOutputExamples } from '../../../api/axios';
import Link from 'next/link';


const TextPage = ({ submitForm, languages, data }) => {

    //console.log(data, 'data from text page');

    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [translatedData, setTranslatedData] = useState(null);

    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { selectedVersion } = useContext(VersionContext);
    const { linkSource, setLinkSource } = useContext(LinkContext);

    console.log(prediction, 'prediction from text page')
    const router = useRouter();

    const handleTextInput = (e) => {
        let textInput = e.target.value;
        setTextInput(textInput);
        setGlobalInput(prevState => ({ ...prevState, "prompt": textInput }));
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
                selectedOutputType);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (submitForm) {
            handleSubmitForm({ preventDefault: () => { } });
        }
    }, [submitForm]);


    useEffect(() => {
        console.log(prediction?.status, 'prediction status from text page');
        if (prediction?.status === 'succeeded') {
            router.push('/result');
        }
    }, [prediction, router]);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const translation = await fetchGenerativeAi(languages);
            setTranslatedData(translation.data);
        };
        fetchDataAndUpdateState();
    }, [languages]);


    const selectedObject = data.find(item => item.attributes.version === selectedVersion);

    console.log(selectedObject, 'selected object from text page');

    const handleExample = (caption, url) => {
        setGlobalInput(prevState => ({ ...prevState, "prompt": caption }));
        const baseUrl = 'http://46.226.110.124:1337';
        setLinkSource(`${baseUrl}${url}`);
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={styles.container}>
                    <div className={styles.headingInfo}>
                        <h2 className={styles.stepHeader}>
                            {translatedData && translatedData.attributes.step3_text_title}
                        </h2>
                        <p className={styles.inputParagraph}>
                            {translatedData && translatedData.attributes.step3_text_description}
                        </p>
                    </div>
                    <div className={styles.textArea}>
                        <h3 className={styles.inputHeader}>
                            Describe your image (max 100 characters)
                        </h3>
                        <div className={styles.inputWrapper}>
                            <input
                                onChange={handleTextInput}
                                value={textInput}
                                className={styles.input}
                                required
                                type="text"
                                placeholder="Write your prompt here" />
                        </div>
                    </div>
                    <div className={styles.buttonArea}>
                        {selectedObject && selectedObject.attributes.output_examples.data
                            ? selectedObject.attributes.output_examples.data.map((item) => (
                                <ul className={styles.list} key={item.id}>
                                    <Link href={`/result`}>
                                        <button
                                            onClick={() => handleExample(item.attributes.caption, item.attributes.url)}
                                            className={styles.suggestionBtn}>{item.attributes.caption}
                                        </button>
                                    </Link>
                                </ul>
                            ))
                            : null}
                    </div>
                </div>
            )}
        </>
    )
}

export async function getStaticProps() {


    const data = await fetchOutputExamples();

    return {
        props: {
            data: data.data,
        },
    };
}

export default TextPage;