import '@/styles/globals.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRouter } from 'next/router';
import styles from '../styles/App.module.css';
import { InputTypeProvider } from '../../context/InputTypeContext';
import { OutputTypeProvider } from '../../context/OutputTypeContext';
import { GlobalInputProvider } from '../../context/GlobalInputContext';
import { PredictionProvider } from '../../context/PredictionContext';
import { useState, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';


function App({ Component, pageProps, translations }) {


  const [nextPageHref, setNextPageHref] = useState('/');
  const [submitForm, setSubmitForm] = useState(false);
  const [languages, setLanguages] = useState('en');

  const handleSubmitForm = async (e) => {
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
    i18n.changeLanguage(languages);
  }, [languages, i18n]);

  return (
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
  )
}


export async function getStaticProps({ locale }) {
  i18n.changeLanguage(locale);
  const translations = await i18n.getResourceBundle(locale, 'translation');

  return {
    props: {
      translations,
    },
  };
}


export default appWithTranslation(App);


