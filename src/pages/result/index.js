import styles from './Result.module.css';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { PredictionContext } from '../../../context/PredictionContext';
import MediaComponent from '../../../components/media';
import { fetchData } from '../../../api/axios';

const Result = ({ t, data }) => {

    const [linkSource, setLinkSource] = useState('');
    const { globalInput } = useContext(GlobalInputContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction } = useContext(PredictionContext);


    console.log(selectedOutputType, 'from result page');
    console.log(prediction?.version, 'prediction from result page');

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

    const selectedObject = data.find(item => item.attributes.version === prediction?.version);

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
                {globalInput.image_path && globalInput.Prompt && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>{t("imageInput")}</p>
                        <Image className={styles.selectedImage} src={globalInput.image_path} alt="animal" width={500} height={500} />
                        <div className={styles.resultItem}>
                            <p className={styles.inputHeader}>{t("textInput")}</p>
                            <div className={styles.userInputDiv}>
                                <p className={styles.userInputParagraph}>
                                    {globalInput.Prompt}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {selectedObject && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>{selectedObject.attributes.output_description}</p>
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

export default Result;