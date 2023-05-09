import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import styles from './camera2.module.css';

const videoConstraints = {
    width: 655,
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
        <div className={styles.cameraDiv}>
            {url === null ? (
                <>
                    <Webcam
                        audio={false}
                        mirrored={true}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                    <button onClick={capturePhoto}>Capture photo</button>
                </>
            ) : (
                <>
                    <img src={url} alt="screenshot" />
                    <button onClick={handleRefresh}>Retake</button>
                </>
            )}
        </div>
    )
}

export default Camera;