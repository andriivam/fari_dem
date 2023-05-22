
export default async function handler(req, res) {
    const { version, input, prompt } = req.body;
    console.log({ input })
    const url = "https://api.replicate.com/v1/predictions";
    const fakeUrl = "http://localhost:3010/v1/predictions";
    console.log(version, 'version from backend');
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: process.env.REPLICATE_API_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            version: version,
            input: input
        }),
    });

    if (response.status !== 201) {
        let error = await response.json();
        console.log(error, 'backend error')
        // res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
}

