import axios from 'axios';
import iziToast from 'izitoast';
const API_KEY = '32117995-da98556d394b8c9b5a96c2a58';
const BASE_URL = 'https://pixabay.com/api';

const per_page = 40;
let page = 1;
let query;

axios.defaults.baseURL = BASE_URL;

const incrementPageCount = () => {
  page += 1;
};

const resetPageCount = () => {
  page = 1;
};

const getCurrentQuery = () => {
  return query;
};

const getCurrentPageCount = () => {
  return page;
};

const fetchPhotos = async newQuery => {
  if (newQuery && query !== newQuery) {
    resetPageCount();
    query = newQuery;
  } else {
    incrementPageCount();
  }

  const searchParams = new URLSearchParams({
    q: newQuery || query,
    page,
    per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    key: API_KEY,
  });

  try {
    const { data, status } = await axios.get(`/?${searchParams}`);

    if (status === 429) {
      iziToast.warning({
        message: 'Too many requests. Limit exceeded. Try again later',
        position: 'topCenter',
        timeout: 8000,
      });

      throw new Error('Too many requests. Limit exceeded. Try again later');
    }

    // const { totalHits, hits } = data;
    // console.log('hits.length:', hits.length);

    // const isEndOfResults = totalHits < page * per_page;

    // console.log('isEndOfResults:', isEndOfResults);

    //   add "newQuery" & "isEndOfResults" to use it for later handling
    return { ...data, newQuery };
    // return { ...data, query, isEndOfResults };
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export { fetchPhotos, getCurrentQuery, getCurrentPageCount, per_page };
