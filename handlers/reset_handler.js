const handleReset = (setInputType, setOutputType, setUserInput, setGlobalInput, setPrediction, setError, setLink) => {
    setInputType('text');
    setOutputType('image');
    setUserInput('');
    setGlobalInput({ "prompt": null, "image": null, "input_image": null });
    setPrediction(null);
    setError(null);
    setLink(null);
    console.log('Reset is working')
}

export default handleReset;