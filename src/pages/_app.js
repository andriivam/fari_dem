import '@/styles/globals.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/App.module.css';

export default function App({ Component, pageProps }) {


  const [nextPageHref, setNextPageHref] = useState('/');

  const router = useRouter();

  const handleNextStep = () => {
    router.push(nextPageHref);
  };

  console.log({ nextPageHref }, 'from app');
  return (
    <div className={styles.pageContainer}>
      <Header setNextPageHref={setNextPageHref} />
      <Component {...pageProps} handleSelectedPath={setNextPageHref} />
      <Footer handleNextStep={handleNextStep} disabled={!nextPageHref} />
    </div>
  )
}
