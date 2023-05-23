import styles from './Hint.module.css';
import versions from '../../versions.json';
import { useState, useEffect } from 'react';


console.log({ versions })

const Hint = ({ inputType, outputType }) => {

    const [hintMessage, setHintMessage] = useState('To start please select an input and output types');
    console.log({ inputType, outputType })

    useEffect(() => {
        const getHintMessage = (inputType, outputType) => {
            const selectedModel = inputType + '_to_' + outputType;
            console.log({ selectedModel })
            const selectedModelHint = versions.find((item) => item.model === selectedModel);
            if (selectedModelHint) {
                setHintMessage(selectedModelHint.hint);
            } else {
                setHintMessage('No hint available for the selected input and output types.');
            }
        };
        getHintMessage(inputType, outputType);
    }, [inputType, outputType]);


    return (
        <div className={styles.container} >
            <div className={styles.hintDiv}>
                <p className={styles.textHint}>{hintMessage}</p>
            </div>
        </div >
    )
};

export default Hint;