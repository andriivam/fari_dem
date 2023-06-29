
export default async function handler(req, res) {
    const { version, input } = req.body;
    const url = "https://api.replicate.com/v1/predictions";


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
};

