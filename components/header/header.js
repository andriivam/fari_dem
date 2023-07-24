import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InputTypeContext } from '../../context/InputTypeContext';
import { OutputTypeContext } from '../../context/OutputTypeContext';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { PredictionContext } from '../../context/PredictionContext';
import { VersionContext } from '../../context/VersionContext';
import { LinkContext } from '../../context/LinkContext';
import { useContext, useEffect, useState } from 'react';
import { fetchData, fetchGenerativeAi, fetchInterfaceComponent } from '../../api/axios';
import cancelPrediction from '../../handlers/cancelPrediction';
import axios from 'axios';


const Header = ({ setNextPageHref, setSubmitForm, languages, setLanguages, disabled }) => {

    const { setSelectedInputType } = useContext(InputTypeContext);
    const { setSelectedOutputType } = useContext(OutputTypeContext);
    const { setGlobalInput } = useContext(GlobalInputContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { setSelectedVersion } = useContext(VersionContext);
    const { setLinkSource } = useContext(LinkContext);
    const [translation, setTranslation] = useState(null);

    const id = prediction?.id;
    const cancelUrl = `https://api.replicate.com/v1/predictions/${id}/cancel`


    const router = useRouter();

    const handleResetPathValue = (pathValue) => {
        setNextPageHref(pathValue);
        setSelectedInputType(null);
        setSelectedOutputType(null);
        setGlobalInput({});
        setPrediction(null);
        setSubmitForm(false);
        setSelectedVersion([]);
        setLinkSource('');
    };

    const handlePreviousStep = async () => {
        setSubmitForm(false);
        if (router.pathname === '/output') {
            setSelectedInputType(null);
            setSelectedOutputType(null);
            setNextPageHref(null);
        }
        else if
            (router.pathname === '/image-page' || router.pathname === '/text-page') {
            setSelectedOutputType(null);
            setGlobalInput({});
            //cancelPrediction(cancelUrl);
        } else if (router.pathname === '/result') {
            setPrediction(null);
            setGlobalInput({});
            setLinkSource('');
        }
        router.back(); // Navigate to the previous page
    };



    const handleLanguageChange = async (event) => {
        const selectedLanguage = event.target.value;
        setLanguages(selectedLanguage);
        await fetchGenerativeAi(selectedLanguage);
        await fetchData(selectedLanguage);
        await fetchInterfaceComponent(selectedLanguage);
        router.push({
            pathname: router.pathname,
            query: { languages: selectedLanguage },
        });
    };


    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const translatedData = await fetchInterfaceComponent(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);



    // const handleCancelation = async () => {
    //     try {
    //         await cancelPrediction(cancelUrl);
    //     } catch (error) {
    //         console.error('Failed to cancel prediction:', error);
    //     }

    // }

    // const handleCancelation = async () => {
    //     try {
    //         const requestBody = {
    //             predictionContextData: prediction,
    //         };

    //         await axios.post('/api/cancel', requestBody);
    //     } catch (error) {
    //         console.error('Failed to cancel prediction:', error);
    //     }
    //     console.log('handler is called');
    // };


    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <button
                    disabled={disabled}
                    onClick={handlePreviousStep}
                    className={styles.headerBtn}>
                    <Image className={styles.icon} src="/static/arrow-left-light.svg" alt="arrow" width={24} height={24} />
                    <span className={styles.hideOnSmall}>
                        {translation && translation.data.attributes.previous}
                    </span>
                </button>
                {/* test button should be remove after */}
                {/* <button
                    disabled={disabled}
                    onClick={handleCancelation}
                    className={styles.previousBtn}>
                    Cancel Prediction
                </button> */}
                {/* test button end */}
            </div>
            <div className={styles.btnContainer}>
                <div className={styles.btnWrapper}>
                    <Link className={styles.link} href="/">
                        <button onClick={() => handleResetPathValue(null)} className={styles.headerBtn}>
                            <Image className={styles.icon} alt="house" src="/static/house-light.svg" width={24} height={24} />
                            {translation && translation.data.attributes.home}
                        </button>
                    </Link>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.headerBtn}>
                        <Image className={styles.icon} alt="earth" src="/static/language-light.svg" width={24} height={24} />
                        {languages === "en" ? <Image src="/static/united-kingdom.png" alt="england flag" width={20} height={20} /> : null}
                        {languages === "fr-FR" ? <Image src="/static/france.png" alt="france flag" width={20} height={20} /> : null}
                        {languages === "nl" ? <Image src="/static/netherlands.png" alt="netherlands flag" width={20} height={20} /> : null}
                        <select
                            className={styles.select}
                            name="languages"
                            onChange={handleLanguageChange}
                            value={languages}
                        >
                            <option value="en" defaultValue="en">
                                EN
                            </option>
                            <option value="fr-FR">
                                FR
                            </option>
                            <option value="nl">
                                NL
                            </option>
                        </select>
                    </button>
                </div>
                <div className={styles.btnWrapper}></div>

                <button className={styles.headerBtn}>
                    <Image className={styles.icon} alt="question mark" src="/static/question-light.svg" width={24} height={24} />
                    <span className={styles.hideOnSmall}>
                        {translation && translation.data.attributes.help}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Header;