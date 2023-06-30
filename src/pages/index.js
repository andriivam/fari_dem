import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.css';
import ImageCard from '../../components/Cards/imageCard/image-card';
import ImageTextCard from '../../components/Cards/imageTextCard/image-text-card';
import TextCard from '../../components/Cards/textCard/textCard';
import { useContext, useEffect, useState } from 'react';
import { InputTypeContext } from '../../context/InputTypeContext';
import usePathValue from '../../handlers/path_handler';
import { fetchGenerativeAi } from '../../api/axios';


export default function Home({ setNextPageHref, languages }) {

  const [translation, setTranslation] = useState(null);
  const { selectedInputType, setSelectedInputType } = useContext(InputTypeContext);
  const { handleGetPathValue } = usePathValue();

  const handleSelectedInput = (inputType) => {
    setSelectedInputType((prevInputType) => (prevInputType === inputType ? null : inputType));
  };

  let pathValue = '/output';

  const handlePathValueClick = () => {
    handleGetPathValue(pathValue);
    setNextPageHref(pathValue);
    setSelectedInputType(null);
  };



  useEffect(() => {

    const fetchDataAndUpdateState = async () => {
      const response = await fetchGenerativeAi(languages);
      setTranslation(response.data);
    };

    fetchDataAndUpdateState();
  }, [languages]);

  return (
    <>
      <Head>
        <title>FARI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.headingInfo}>
          <h2 className={styles.header}>
            {translation && translation.attributes.step1_title}
          </h2>
          <p className={styles.inputParagraph}>
            {translation && translation.attributes.step1_description}
          </p>
        </div>
        <div className={styles.cartsDiv}>
          <ImageCard
            handleSelectedInput={() => handleSelectedInput('image')}
            selectedInputType={selectedInputType === 'image'}
            handlePathValueClick={handlePathValueClick}
          />
          <TextCard
            onClick={() => console.log('test')}
            handleSelectedInput={() => handleSelectedInput('text')}
            selectedInputType={selectedInputType === 'text'}
            handlePathValueClick={handlePathValueClick}
          />
          <ImageTextCard
            handleSelectedInput={() => handleSelectedInput('image + text')}
            selectedInputType={selectedInputType === 'image + text'}
            handlePathValueClick={handlePathValueClick}
          />
        </div>
      </div>
    </>
  )
};