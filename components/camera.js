import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import styles from './camera2.module.css';
import Image from 'next/image';

const videoConstraints = {
    width: 895,
    height: 440,
    facingMode: 'environment'
};


const Camera = () => {

    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = useCallback(async (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }, [webcamRef]);


    const handleRefresh = (e) => {
        e.preventDefault();
        setUrl(null);
    }

    return (
        <div className={styles.photoDiv}>
            {url === null ? (
                <>
                    <Webcam
                        audio={false}
                        mirrored={true}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className={styles.webcam}
                    />
                    <button className={styles.cameraBtn} onClick={capturePhoto} aria-label="Capture photo"><Image className={styles.iconPhoto} src='/static/circle.svg' width={80} height={80} /></button>
                </>
            ) : (
                <div>
                    <img className={styles.screenshot} src={url} alt="screenshot" />
                    <button onClick={handleRefresh} className={styles.retakePhoto} aria-label="take new photo"><Image src='/static/close.svg' className={styles.iconRetakePhoto} width={50} height={50} /></button>
                </div>
            )}
        </div>
    )
}

export default Camera;