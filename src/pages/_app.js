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
import { useContext, useState } from 'react';
import { HiddenButtonProvider } from '../../context/HiddenButtonContext';


export default function App({ Component, pageProps }) {


  const [nextPageHref, setNextPageHref] = useState('/');

  const { globalInput } = useContext(GlobalInputContext) || {};

  const router = useRouter();

  const handleNextStep = () => {
    router.push(nextPageHref);
  };


  console.log({ nextPageHref }, 'from app');


  return (
    <HiddenButtonProvider>
      <PredictionProvider>
        <GlobalInputProvider>
          <InputTypeProvider>
            <OutputTypeProvider>
              <div className={styles.pageContainer}>
                <Header setNextPageHref={setNextPageHref} disabled={!nextPageHref} />
                <Component {...pageProps} setNextPageHref={setNextPageHref} />
                <Footer handleNextStep={handleNextStep} disabled={!nextPageHref} />
              </div>
            </OutputTypeProvider>
          </InputTypeProvider>
        </GlobalInputProvider>
      </PredictionProvider>
    </HiddenButtonProvider>
  )
}
