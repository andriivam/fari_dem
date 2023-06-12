import '@/styles/globals.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRouter } from 'next/router';
import styles from '../styles/App.module.css';
import { InputTypeProvider } from '../../context/InputTypeContext';
import { OutputTypeProvider } from '../../context/OutputTypeContext';
import { GlobalInputProvider } from '../../context/GlobalInputContext';
import { PredictionProvider } from '../../context/PredictionContext';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { useState } from 'react';
import { appWithTranslation } from 'next-i18next';


function App({ Component, pageProps }) {

  const [nextPageHref, setNextPageHref] = useState('/');
  const [submitForm, setSubmitForm] = useState(false);
  const [languages, setLanguages] = useState('en');


  console.log(languages, 'from app')
  // const { globalInput, setGlobalInput } = useContext(GlobalInputContext) || {};

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


  return (
    <PredictionProvider>
      <GlobalInputProvider>
        <InputTypeProvider>
          <OutputTypeProvider>
            <div className={styles.pageContainer}>
              <Header
                setNextPageHref={setNextPageHref}
                disabled={!nextPageHref}
                setSubmitForm={setSubmitForm}
                languages={languages}
                setLanguages={setLanguages}
              />
              <Component
                {...pageProps}
                setNextPageHref={setNextPageHref}
                submitForm={submitForm} />
              {isResultPage ? null : <Footer handleNextStep={handleNextStep} disabled={!nextPageHref} onSubmit={handleSubmitForm} />}
            </div>
          </OutputTypeProvider>
        </InputTypeProvider>
      </GlobalInputProvider>
    </PredictionProvider>
  )
}

export default appWithTranslation(App);
