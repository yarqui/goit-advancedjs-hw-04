import axios from 'axios';
import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
const API_KEY = '32117995-da98556d394b8c9b5a96c2a58';
const BASE_URL = 'https://pixabay.com/api';

axios.defaults.baseURL = BASE_URL;

const fetchPhotos = async (query, page = 1) => {
  let page = 1;

  const searchParams = new URLSearchParams({
    q: query,
    page,
    per_page: 40,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    key: API_KEY,
  });

  try {
    const { data, status } = await axios.get(`/?${searchParams}`);

    console.log('status:', status);

    if (status === 429) {
      iziToast.warning({
        message: 'Too many requests. Limit exceeded. Try again later',
        position: 'topCenter',
      });

      throw new Error('Too many requests. Limit exceeded. Try again later');
    }

    //   add "query" to the returned object to use it for incapsulation later in onSubmit
    return { ...data, query };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { fetchPhotos };
