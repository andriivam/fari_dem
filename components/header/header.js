import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InputTypeContext } from '../../context/InputTypeContext';
import { OutputTypeContext } from '../../context/OutputTypeContext';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { PredictionContext } from '../../context/PredictionContext';
import { useContext, useState, useEffect } from 'react';
import i18n from '../../src/i18n';
import { useTranslation } from 'react-i18next';

const Header = ({ setNextPageHref, setSubmitForm, languages, setLanguages }) => {

    const { setSelectedInputType } = useContext(InputTypeContext);
    const { setSelectedOutputType } = useContext(OutputTypeContext);
    const { setGlobalInput } = useContext(GlobalInputContext);
    const { setPrediction } = useContext(PredictionContext);

    const router = useRouter();
    const { t } = useTranslation();

    const handleResetPathValue = (pathValue) => {
        setNextPageHref(pathValue);
        setSelectedInputType(null);
        setSelectedOutputType(null);
        setGlobalInput({});
        setPrediction(null);
        setSubmitForm(false);
    };

    const handlePreviousStep = () => {
        setSubmitForm(false);
        if (router.pathname === '/output') {
            setSelectedInputType(null);
            setSelectedOutputType(null);
        }
        else if
            (router.pathname === '/image-page' || router.pathname === '/text-page' || router.pathname === '/image-text-page') {
            setSelectedOutputType(null);
            setGlobalInput({});
        } else if (router.pathname === '/result') {
            setPrediction(null);
            setGlobalInput({});
        }
        router.back(); // Navigate to the previous page
    };


    // useEffect(() => {
    //     i18n.changeLanguage(languages);
    // }, [languages, i18n]);

    const handleLanguageChange = async (event) => {
        const selectedLanguage = event.target.value;
        setLanguages(selectedLanguage);
        // Use i18next to change the language
    };


    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <button
                    onClick={handlePreviousStep}
                    className={styles.previousBtn}>
                    <Image className={styles.icon} src="/static/arrow-left-light.svg" alt="arrow" width={24} height={24} />
                    {t("Previous")}
                </button>
            </div>
            <div className={styles.btnContainer}>
                <div className={styles.btnWrapper}>
                    <Link className={styles.link} href="/">
                        <button onClick={() => handleResetPathValue(null)} className={styles.homeBtn}>
                            <Image className={styles.icon} alt="house" src="/static/house-light.svg" width={24} height={24} />
                            {t("Home")}
                        </button>
                    </Link>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.languageBtn}>
                        <Image className={styles.icon} alt="earth" src="/static/language-light.svg" width={24} height={24} />
                        <select
                            className={styles.select}
                            name="languages"
                            onChange={handleLanguageChange}
                            value={languages}
                        >
                            <option value="en" defaultValue="en">
                                EN
                            </option>
                            <option value="fr">
                                FR
                            </option>
                            <option value="nl">
                                NL
                            </option>
                        </select>
                    </button>
                </div>
                <div className={styles.btnWrapper}></div>

                <button className={styles.helpBtn}>
                    <Image className={styles.icon} alt="question mark" src="/static/question-light.svg" width={24} height={24} />
                    {t("Help")}
                </button>
            </div>
        </div>
    )
}

export default Header;