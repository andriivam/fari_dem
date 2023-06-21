import styles from '../../styles/Output.module.css';
import ImageCard from '../../../components/Cards/imageCard/image-card';
import VideoCard from '../../../components/Cards/videoCard/video-card';
import DCard from '../../../components/Cards/3DCard/3d-card';
import { useContext, useState } from 'react';
import { InputTypeContext } from '../../../context/InputTypeContext';
import { OutputTypeContext } from '../../../context/OutputTypeContext';
import { VersionContext } from '../../../context/VersionContext';
import usePathValue from '../../../handlers/path_handler';
import { fetchData } from '../../../api/axios';





const Output = ({ setNextPageHref, t, data }) => {


    const { selectedInputType } = useContext(InputTypeContext);
    const { selectedOutputType, setSelectedOutputType } = useContext(OutputTypeContext);
    const { selectedVersion, setSelectedVersion } = useContext(VersionContext);
    const { handleGetPathValue } = usePathValue();
    // const [selectedOutputItems, setSelectedOutputItems] = useState([]);



    console.log(selectedOutputType, 'selectedOutputType');
    console.log(selectedVersion, 'selectedVersion')

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
        console.log(version, 'selected version');
    };

    const handlePathValueClick = () => {
        handleGetPathValue(pathValue);
        setNextPageHref(pathValue);
    };


    console.log(data, 'data');

    const outputComponentMap = {
        'image': ImageCard,
        'video': VideoCard,
        '3D': DCard,
    };



    return (
        <div className={styles.container}>
            <div className={styles.headingInfo}>
                <h2 className={styles.header}>{t("Step2")}</h2>
                <p className={styles.inputParagraph}>{t("outputType")}</p>
            </div>
            <div className={styles.cartsDiv}>
                {data.data.map((outputItem) => {
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
                                t={t}
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


export async function getStaticProps() {

    const data = await fetchData();

    return {
        props: {
            data: data,
        },
    };
}

export default Output;
