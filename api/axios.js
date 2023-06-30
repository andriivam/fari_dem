import axios from 'axios';

let url = 'http://46.226.110.124:1337/api/generative-ai-models';
let url2 = 'http://46.226.110.124:1337/api/demo-generative-ai';
let url3 = 'http://46.226.110.124:1337/api/interface-component';

export const fetchData = async (locale) => {

    try {
        const response = await axios.get(`${url}?locale=${locale}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
export const fetchOutputExamples = async () => {

    try {
        const response = await axios.get(`${url}?populate=*`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


export const fetchGenerativeAi = async (locale) => {

    try {
        const response = await axios.get(`${url2}?locale=${locale}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
export const fetchInterfaceComponent = async (locale) => {

    try {
        const response = await axios.get(`${url3}?locale=${locale}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

