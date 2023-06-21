import styles from '../../styles/TextPage.module.css';
import { useState, useContext, useEffect } from 'react';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { VersionContext } from '../../../context/VersionContext';
import handleSubmit from '../../../handlers/submit_handler';
import Loading from '../../../components/Loading/loading';
import { PredictionContext } from '../../../context/PredictionContext';
import { useRouter } from 'next/router';

const TextPage = ({ submitForm, t }) => {

    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { selectedVersion } = useContext(VersionContext);
    console.log(selectedVersion, 'selectedVersion from text page')

    const router = useRouter();



    const handleTextInput = (e) => {
        let textInput = e.target.value;
        setTextInput(textInput);
        setGlobalInput(prevState => ({ ...prevState, "prompt": textInput }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log('handler was called');
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
            console.log(('submitForm was clicked'))
        }
    }, [submitForm]);


    useEffect(() => {
        console.log(prediction?.status, 'prediction status from text page');
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
                        <h2 className={styles.stepHeader}>{t("Step3_textPage")}</h2>
                        <p className={styles.inputParagraph}>{t("Step3_textPage_paragraph")}</p>
                    </div>
                    <div className={styles.textArea}>
                        <h3 className={styles.inputHeader}>{t("Step3_textPage_placeholder")}</h3>
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
                </div>
            )}
        </>
    )
}

export default TextPage;