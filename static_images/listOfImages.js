import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfPhotos = async (query) => {
    // console.log({ query })
    const photos = await unsplash.search.getPhotos({
        query: query,
        perPage: 4
    });
    const unsplashResults = photos.response.results;
    console.log(unsplashResults, 'unsplashResults')
    return unsplashResults.map((result => result.urls.small));
}

export default getListOfPhotos;