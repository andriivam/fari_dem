const handleReset = (setInputType, setOutputType, setUserInput, setGlobalInput, setPrediction, setError, setLink, setShowHint) => {
    setInputType('text');
    setOutputType('image');
    setUserInput('');
    setGlobalInput({ "prompt": null, "image": null, "input_image": null });
    setPrediction(null);
    setError(null);
    setLink(null);
    setShowHint(false);
    console.log('Reset is working')
}

export default handleReset;