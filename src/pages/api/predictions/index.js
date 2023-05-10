
export default async function handler(req, res) {
    const { version } = req.body;
    console.log(version, 'version from backend');
    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            Authorization: process.env.REPLICATE_API_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // Pinned to a specific version of Stable Diffusion
            // See https://replicate.com/stability-ai/stable-diffussion/versions
            version: version,
            // This is the text prompt that will be submitted by a form on the frontend
            input: { prompt: req.body.prompt },
        }),
    });
    console.log('Response received:', response);

    if (response.status !== 201) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
}