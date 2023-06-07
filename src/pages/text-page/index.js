import styles from '../../styles/TextPage.module.css';
import { useState, useContext, useEffect } from 'react';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import handleSubmit from '../../../handlers/submit_handler';
import Loading from '../../../components/Loading/loading';
import { PredictionContext } from '../../../context/PredictionContext';
import { useRouter } from 'next/router';

const TextPage = () => {

    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);

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
                selectedInputType,
                selectedOutputType);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
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
                        <h2 className={styles.stepHeader}>Step 3: Write your text</h2>
                        <p className={styles.inputParagraph}>Write a text describing the image you would like to be created by the algorithm.</p>
                    </div>
                    <div className={styles.textArea}>
                        <h3 className={styles.inputHeader}>Describe your image (max 100 characters)</h3>
                        <form id="text-input" className={styles.inputWrapper} onSubmit={handleSubmitForm}>
                            <input
                                onChange={handleTextInput}
                                value={textInput}
                                className={styles.input}
                                required
                                type="text"
                                placeholder="Write your prompt here" />
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default TextPage;