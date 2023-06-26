import '@/styles/globals.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRouter } from 'next/router';
import styles from '../styles/App.module.css';
import { InputTypeProvider } from '../../context/InputTypeContext';
import { OutputTypeProvider } from '../../context/OutputTypeContext';
import { GlobalInputProvider } from '../../context/GlobalInputContext';
import { PredictionProvider } from '../../context/PredictionContext';
import { VersionProvider } from '../../context/VersionContext';
import { useState, useEffect, use } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';


function App({ Component, pageProps, translations }) {


  const [nextPageHref, setNextPageHref] = useState('/');
  const [submitForm, setSubmitForm] = useState(false);
  const [languages, setLanguages] = useState('en');

  const handleSubmitForm = async (e) => {
    //e.preventDefault();
    try {
      setSubmitForm(true);
    } catch (error) {
      console.log(error);
    }

  };

  const router = useRouter();

  const handleNextStep = () => {
    router.push(nextPageHref);
  };


  const isResultPage = router.pathname === '/result';

  console.log({ nextPageHref }, 'from app');


  const { t } = useTranslation('translation', { resources: translations });



  useEffect(() => {
    const languages = router.query.languages || i18n.language || i18n.options.fallbackLng[0];

    if (languages && languages !== i18n.language) {
      i18n.changeLanguage(languages);
      setLanguages(router.query.languages);
    }
  }, [router.query.languages, languages]);

  return (
    <VersionProvider>
      <PredictionProvider>
        <GlobalInputProvider>
          <InputTypeProvider>
            <OutputTypeProvider>
              <I18nextProvider i18n={i18n}>
                <div className={styles.pageContainer}>
                  <Header
                    setNextPageHref={setNextPageHref}
                    disabled={!nextPageHref}
                    setSubmitForm={setSubmitForm}
                    setLanguages={setLanguages}
                    languages={languages}
                  />
                  <Component
                    {...pageProps}
                    setNextPageHref={setNextPageHref}
                    submitForm={submitForm}
                    setSubmitForm={setSubmitForm}
                    t={t}
                  />
                  {isResultPage ? null : !submitForm && (
                    <Footer
                      handleNextStep={handleNextStep}
                      disabled={!nextPageHref}
                      onSubmit={handleSubmitForm}
                    />
                  )}
                </div>
              </I18nextProvider>
            </OutputTypeProvider>
          </InputTypeProvider>
        </GlobalInputProvider>
      </PredictionProvider>
    </VersionProvider>
  )
}


export async function getStaticProps({ locale, query }) {
  const languages = query.languages || locale;
  await i18n.changeLanguage(languages); // Update the language using i18n.changeLanguage
  const translations = await serverSideTranslations(languages, ['common']);

  return {
    props: {
      translations,
    },
  };
}


export default appWithTranslation(App);


