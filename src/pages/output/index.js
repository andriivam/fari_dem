import styles from '../../styles/Output.module.css';
import ImageCard from '../../../components/Cards/imageCard/image-card';
import VideoCard from '../../../components/Cards/videoCard/video-card';
import DCard from '../../../components/Cards/3DCard/3d-card';
import { useContext, useEffect, useState } from 'react';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { VersionContext } from '../../../context/VersionContext';
import usePathValue from '../../../handlers/path_handler';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';


// export async function getStaticProps() {

//     const languages = 'en';

//     const data = await fetchData(languages);

//     return {
//         props: {
//             data: data.data,
//             languages,
//         },
//     };
// }


const Output = ({ setNextPageHref, disabled, languages }) => {

    const [translation, setTranslation] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType, setSelectedOutputType } = useContext(OutputTypeContext);
    const { selectedVersion, setSelectedVersion } = useContext(VersionContext);
    const { handleGetPathValue } = usePathValue();


    console.log(selectedOutputType, 'selectedOutputType');
    console.log(selectedVersion, 'selectedVersion from output');

    let pathValue;

    if (selectedInputType === 'text') {
        pathValue = `/text-page`;
    } else if (selectedInputType === 'image + text') {
        pathValue = '/image-page';
    } else if (selectedInputType === 'image') {
        pathValue = '/image-page';
    }


    const handleSelectedOutput = (outputType, version) => {
        setSelectedVersion(version);
        setSelectedOutputType(outputType);
    };

    const handlePathValueClick = () => {
        if (selectedOutputType === '') {
            disabled;
        }
        handleGetPathValue(pathValue);
        setNextPageHref(pathValue);
    };

    const outputComponentMap = {
        'image': ImageCard,
        'video': VideoCard,
        '3D': DCard,
    };


    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const response = await fetchData(languages);
            setResponseData(response);
            const translatedData = await fetchGenerativeAi(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);


    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>
                    {translation && translation.data.attributes.step2_title}
                </h2>
                <p className={styles.inputParagraph}>
                    {translation && translation.data.attributes.step2_description}
                </p>
            </div>
            <div className={styles.cartsDiv}>
                {responseData && responseData?.data.map((outputItem) => {
                    const input = outputItem.attributes.input;
                    const OutputComponent = outputComponentMap[outputItem.attributes.output];
                    const isSelected = selectedVersion.includes(outputItem.attributes.version);
                    if (OutputComponent && input === selectedInputType) {
                        return (
                            <OutputComponent
                                key={outputItem.id}
                                handleSelectedOutput={() => handleSelectedOutput(outputItem.attributes.output, outputItem.attributes.version)}
                                selectedOutputType={isSelected && selectedOutputType}
                                handlePathValueClick={handlePathValueClick}
                                task={outputItem.attributes.task}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    )
}


export default Output;
