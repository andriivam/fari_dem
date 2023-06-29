const cancelPrediction = async () => {

    try {
        console.log(process.env.REPLICATE_API_TOKEN, 'token from cancel handler');

        const response = await fetch("https://api.replicate.com/v1/predictions/edvyuzzb4672irnlqnur72r4jy/cancel", {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Authorization: process.env.REPLICATE_API_TOKEN,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            console.log("Prediction canceled successfully");
            // Perform any additional actions after canceling the prediction
        } else {
            console.error("Failed to cancel prediction");
        }
    } catch (error) {
        console.error("Error canceling prediction:", error);
    }
};

export default cancelPrediction;