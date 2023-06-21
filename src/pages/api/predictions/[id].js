
export default async function handler(req, res) {
    const url = "https://api.replicate.com/v1/predictions/";

    const response = await fetch(url + req.query.id,
        {
            headers: {
                Authorization: process.env.REPLICATE_API_TOKEN,
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        let error = await response.json();
        // res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.end(JSON.stringify(prediction));
}