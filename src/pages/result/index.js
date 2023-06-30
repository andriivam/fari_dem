import styles from './Result.module.css';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { GlobalInputContext } from '../../../context/GlobalInputContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { PredictionContext } from '../../../context/PredictionContext';
import { LinkContext } from '../../../context/LinkContext';
import MediaComponent from '../../../components/media';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';

const Result = ({ languages }) => {

    const [translation, setTranslation] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const { globalInput } = useContext(GlobalInputContext);
    const { selectedOutputType } = useContext(OutputTypeContext);
    const { prediction } = useContext(PredictionContext);
    const { linkSource } = useContext(LinkContext);
    const [predictionLink, setPredictionLink] = useState(null);

    //console.log(selectedOutputType, 'from result page');
    //console.log(prediction?.version, 'prediction from result page');
    //console.log(globalInput, 'globalInput from result page');

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
        const fetchDataAndUpdateState = async () => {
            const response = await fetchData(languages);
            setResponseData(response);
            const translationData = await fetchGenerativeAi(languages);
            setTranslation(translationData);
        };
        fetchDataAndUpdateState();
        setPredictionLink(link);
    }, [languages, link]);

    const selectedObject = responseData?.data.find(item => item.attributes.version === prediction?.version);
    console.log(linkSource, 'link from result')

    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.stepHeader}>
                    {translation && translation.data.attributes.step4_title}
                </h2>
                <p className={styles.resultHeader}>
                    {translation && translation.data.attributes.step4_description}
                </p>
            </div>
            <div className={styles.result}>
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
                {globalInput.image_path && globalInput.Prompt && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>This is the image you chose</p>
                        <Image className={styles.selectedImage} src={globalInput.image_path} alt="animal" width={500} height={500} />
                        <div className={styles.resultItem}>
                            <p className={styles.inputHeader}>This is the text you wrote</p>
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
                        {predictionLink ? < MediaComponent
                            src={predictionLink}
                            className={styles.resultImage}
                            width={400}
                            height={400}
                            alt="replicate video"
                            autoPlay
                            controls
                            loop /> :
                            null}
                    </div>
                )}

                {!selectedObject && (
                    <div className={styles.resultItem}>
                        <p className={styles.inputHeader}>This is the example of output  based on the parameters you have set.</p>
                        < MediaComponent
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
    )
}

// export async function getStaticProps({ locale }) {

//     const data = await fetchData(locale);

//     return {
//         props: {
//             data: data.data,
//             languages: locale,
//         },
//     };
// }

export default Result;