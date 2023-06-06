import styles from '../../styles/TextPage.module.css';
import { useState, useContext, useEffect } from 'react';
import usePathValue from '../../../handlers/path_handler';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import handleSubmit from '../../../handlers/submit_handler';
import Loading from '../../../components/Loading/loading';
import { PredictionContext } from '../../../context/PredictionContext';

const TextPage = ({ setNextPageHref }) => {

    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { handleGetPathValue } = usePathValue();

    const { globalInput, setGlobalInput } = useContext(GlobalInputContext);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction, setPrediction } = useContext(PredictionContext);


    const handleTextInput = (e) => {
        let textInput = e.target.value;
        setTextInput(textInput);
        // setGlobalInput(prevState => ({ ...prevState, "prompt": textInput }));
    };


    const handlePathValueClick = (pathValue) => {
        handleGetPathValue(pathValue);
        setNextPageHref(pathValue);
    };



    const handleSubmitForm = (e) => {
        // e.preventDefault();
        // setLoading(true);
        setGlobalInput(prevState => ({ ...prevState, "prompt": textInput }));
        handleSubmit(e, globalInput, setPrediction, setError, error, selectedInputType, selectedOutputType);
        console.log('form was successfully submitted')
    }


    useEffect(() => {
        console.log(prediction?.status, 'prediction status from text page');
        if (prediction?.status === 'succeeded') {
            setLoading(false);
            handlePathValueClick('/result');
        }
    }, [prediction, handlePathValueClick]);


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={styles.container}>
                    <div className={styles.headingInfo}>
                        <h2 className={styles.stepHeader}>Step 3: Write your text</h2>
                        {prediction && <p>status: {prediction.status}</p>}
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