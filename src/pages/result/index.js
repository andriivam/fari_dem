import styles from './Result.module.css';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { PredictionContext } from '../../../context/PredictionContext';
import MediaComponent from '../../../components/media';

const Result = () => {

    const [linkSource, setLinkSource] = useState('');
    const { globalInput } = useContext(GlobalInputContext);
    const { prediction } = useContext(PredictionContext);

    const { output } = prediction || {};
    let link = "";

    if (Array.isArray(output)) {
        link = output[0];
    } else if (typeof output === "string") {
        link = output || outputFileTracing;
    } else if (typeof output === "object" && (output.img_out || output.animation)) {
        link = output.img_out || output.animation;
    }

    useEffect(() => {
        setLinkSource(link);
    }, [link]);


    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.stepHeader}>Result</h2>
                <p className={styles.resultHeader}>This is the output of the algorithm based on the parameters you have set.</p>
            </div>
            <div className={styles.result}>
                <div className={styles.resultItem}>
                    {globalInput.prompt && (
                        <div className={styles.resultItem}>
                            <p className={styles.inputHeader}>This is the text you wrote</p>
                            <div className={styles.userInputDiv}>
                                <p className={styles.userInputParagraph}>
                                    {globalInput.prompt}
                                </p>
                            </div>
                        </div>
                    )}
                    {globalInput.image && (
                        <div className={styles.resultItem}>
                            <p className={styles.inputHeader}>This is the image you chose</p>
                            <Image className={styles.selectedImage} src={globalInput.image} alt="animal" width={500} height={500} />
                        </div>
                    )}
                    {globalInput.input_image && (
                        <div className={styles.resultItem}>
                            <p className={styles.inputHeader}>This is the image you chose</p>
                            <Image className={styles.selectedImage} src={globalInput.input_image} alt="animal" width={500} height={500} />
                        </div>
                    )}
                </div>
                <div className={styles.resultItem}>
                    {prediction && prediction.output && (
                        <div className={styles.resultItem}>
                            <p className={styles.inputHeader}>This is the image created by the algorithm based on the text you wrote</p>
                            <MediaComponent
                                src={linkSource}
                                className={styles.resultImage}
                                width={400}
                                height={400}
                                alt="replicate video"
                                autoPlay
                                controls
                                loop />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Result;