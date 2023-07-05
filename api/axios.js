import axios from 'axios';

let url = 'http://46.226.110.124:1337/api/generative-ai-models';
let url2 = 'http://46.226.110.124:1337/api/demo-generative-ai';
let url3 = 'http://46.226.110.124:1337/api/interface-component';

export const fetchData = async (languages) => {

    try {
        const response = await axios.get(`/api/proxy?languages=${languages}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
export const fetchOutputExamples = async () => {

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
        const response = await axios.get(`${apiUrl}?populate=*`);;
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


export const fetchGenerativeAi = async (languages) => {

    try {
        const response = await axios.get(`/api/proxy1?languages=${languages}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


export const fetchInterfaceComponent = async (languages) => {

    try {
        const response = await axios.get(`/api/proxy3?languages=${languages}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

