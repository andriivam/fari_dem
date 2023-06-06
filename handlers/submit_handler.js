import getVersion from '../functions/set-version';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const handleSubmit = async (e, globalInput, setPrediction, setError, error, inputType, outputType) => {
    const endPoint = "/api/predictions";
    const fakeEndPoint = "http://localhost:3010/v1/predictions";

    const version = getVersion(inputType, outputType);
    if (globalInput === {}) {
        setSubmittedWithoutInputs(true);
        return;
    }
    try {
        e.preventDefault();
        const response = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                version: version,
                input: globalInput
            }),
        });

        let prediction = await response.json();

        if (response.status !== 201) {
            setError(prediction.detail);
            console.log(error, 'error from frontend');
            return;
        }

        setPrediction(prediction);

        while (prediction.status !== "succeeded" && prediction.status !== "failed") {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();

            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction);
        }

        // const { output } = prediction;
        // let link = "";

        // if (Array.isArray(output)) {
        //     link = output[0];
        //     setLinkSource(link);
        // } else if (typeof output === "string") {
        //     link = output || outputFileTracing;
        //     setLinkSource(link);
        // } else if (typeof output === "object" && (output.img_out || output.animation)) {
        //     link = output.img_out || output.animation;
        //     setLinkSource(link);
        // }

    } catch (error) {
        console.log({ error });
    }
};

export default handleSubmit;


