import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { method, body } = req;
        const { languages } = req.query;
        console.log(method, body, 'from proxy server');
        console.log(languages, 'locale from proxy server');
        console.log(req.query, 'req.query from proxy server');

        const url = `http://46.226.110.124:1337/api/generative-ai-models?locale=${languages}`;

        const response = await axios.request({
            method,
            url,
            data: body,
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Proxy error' });
    }
}