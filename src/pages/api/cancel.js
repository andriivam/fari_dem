import cancelPrediction from '../../../handlers/cancelPrediction';


export default async function handler(req, res) {
    const { predictionContextData } = req.body;
    const cancelUrl = predictionContextData.urls.cancel;
    const apiToken = process.env.REPLICATE_API_TOKEN;

    try {
        await cancelPrediction(cancelUrl, apiToken);
        res.status(200).json({ message: 'Prediction canceled successfully' });
    } catch (error) {
        console.error('Error canceling prediction:', error);
        res.status(500).json({ error: 'Failed to cancel prediction' });
    }
}