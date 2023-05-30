import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import styles from './camera.module.css';
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
    }, [webcamRef, setUrl]);




    const handleRefresh = (e) => {
        e.preventDefault();
        setUrl(null);
        onStateChange(null)
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
                    <button className={styles.cameraBtn} onClick={capturePhoto} aria-label="Capture photo"><Image alt="circle icon" className={styles.iconPhoto} src='/static/circle.svg' width={80} height={80} /></button>
                </>
            ) : (
                <div>
                    <img className={styles.screenshot} src={url} alt="screenshot" />
                    <button onClick={handleRefresh} className={styles.retakePhoto} aria-label="take new photo"><Image alt="close icon" src='/static/close.svg' className={styles.iconRetakePhoto} width={50} height={50} /></button>
                </div>
            )}
        </div>
    )
}

export default Camera;