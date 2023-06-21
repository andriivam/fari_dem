import styles from './Result.module.css';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { PredictionContext } from '../../../context/PredictionContext';
import MediaComponent from '../../../components/media';

const Result = ({ t }) => {

    const [linkSource, setLinkSource] = useState('');
    const { globalInput } = useContext(GlobalInputContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction } = useContext(PredictionContext);
    console.log(selectedOutputType, 'from result page')

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
                <h2 className={styles.stepHeader}>{t("Result")}</h2>
                <p className={styles.resultHeader}>{t("resultHeader")}</p>
            </div>
            <div className={styles.result}>
                {globalInput.prompt && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>{t("textInput")}</p>
                        <div className={styles.userInputDiv}>
                            <p className={styles.userInputParagraph}>
                                {globalInput.prompt}
                            </p>
                        </div>
                    </div>
                )}
                {globalInput.image && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>{t("imageInput")}</p>
                        <Image className={styles.selectedImage} src={globalInput.image} alt="animal" width={500} height={500} />
                    </div>
                )}
                {globalInput.input_image && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>{t("imageInput")}</p>
                        <Image className={styles.selectedImage} src={globalInput.input_image} alt="animal" width={500} height={500} />
                    </div>
                )}
                <div className={styles.resultItem}>
                    {prediction && prediction.output && (
                        <div className={styles.resultItem}>
                            {globalInput.prompt && selectedOutputType === 'image' && (<p className={styles.inputHeader}>{t("globalInput_header1")}</p>)}
                            {globalInput.prompt && selectedOutputType === 'video' && (<p className={styles.inputHeader}>{t("globalInput_header2")}</p>)}
                            {globalInput.prompt && selectedOutputType === '3D' && (<p className={styles.inputHeader}>{t("globalInput_header3")}</p>)}
                            {globalInput.image && selectedOutputType === 'image' && (<p className={styles.inputHeader}>This is the image created by the algorithm from the image you chose</p>)}
                            {globalInput.image && selectedOutputType === '3D' && (<p className={styles.inputHeader}>This is the 3D object created by the algorithm from the image you chose</p>)}
                            {globalInput.input_image && selectedOutputType === 'video' && (<p className={styles.inputHeader}>This is the video created by the algorithm from the image you chose</p>)}
                            {linkSource ? < MediaComponent
                                src={linkSource}
                                className={styles.resultImage}
                                width={400}
                                height={400}
                                alt="replicate video"
                                autoPlay
                                controls
                                loop /> : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Result;