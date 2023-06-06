import '@/styles/globals.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/App.module.css';
import { InputTypeProvider } from '../../context/InputTypeContext';
import { OutputTypeProvider } from '../../context/OutputTypeContext';
import { GlobalInputProvider } from '../../context/GlobalInputContext';
import { FormProvider } from '../../context/FormContext';
import { PredictionProvider } from '../../context/PredictionContext';
import handleSubmit from '../../handlers/submit_handler';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { useContext, useEffect } from 'react';


export default function App({ Component, pageProps }) {


  const [nextPageHref, setNextPageHref] = useState('/');

  const { globalInput } = useContext(GlobalInputContext) || {};

  const router = useRouter();

  const handleNextStep = () => {
    // if (nextPageHref === '/image-page' && globalInput) {
    //   handleSubmit(globalInput);
    // } else {
    //   router.push(nextPageHref);
    // }

    router.push(nextPageHref);
  };

  // useEffect(() => {
  //   if (nextPageHref) {
  //     handleNextStep();
  //   }
  // }, [nextPageHref]);


  console.log({ nextPageHref }, 'from app');


  return (
    <PredictionProvider>
      <GlobalInputProvider>
        <FormProvider>
          <InputTypeProvider>
            <OutputTypeProvider>
              <div className={styles.pageContainer}>
                <Header setNextPageHref={setNextPageHref} />
                <Component {...pageProps} setNextPageHref={setNextPageHref} />
                <Footer handleNextStep={handleNextStep} disabled={!nextPageHref} />
              </div>
            </OutputTypeProvider>
          </InputTypeProvider>
        </FormProvider>
      </GlobalInputProvider>
    </PredictionProvider>
  )
}
