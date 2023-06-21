import axios from 'axios';


let url = 'http://46.226.110.124:1337/api/generative-ai-models';


export const fetchData = async () => {

    try {
        const response = await axios.get(url);
        console.log(response.data, 'from axios');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

