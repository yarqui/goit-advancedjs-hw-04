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

const fetchPhotos = async newQuery => {
  console.log('newQuery:', newQuery);
  console.log('query === newQuery:', query === newQuery);
  console.log('page:', page);

  if (newQuery && query !== newQuery) {
    resetPageCount();
    query = newQuery;
  } else {
    incrementPageCount();
  }
  console.log('page:', page);

  const searchParams = new URLSearchParams({
    // q: newQuery || '',
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
    // TODO: REMOVE ALL HANDLING LOGIC TO THE OUTER CODE.
    // ❗❗❗RETURN ONLY RES - THE PROMISE
    if (status === 429) {
      iziToast.warning({
        message: 'Too many requests. Limit exceeded. Try again later',
        position: 'topCenter',
        timeout: 8000,
      });

      throw new Error('Too many requests. Limit exceeded. Try again later');
    }

    const { totalHits, hits } = data;
    console.log('hits.length:', hits.length);

    const isEndOfResults = totalHits < page * per_page;

    console.log('isEndOfResults:', isEndOfResults);

    //   add "query" & "isEndOfResults" to use it for later handling
    return { ...data, query, isEndOfResults };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { fetchPhotos, getCurrentQuery };
