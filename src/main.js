// card template
// <div class="photo-card">
//     <img src="" alt="" loading="lazy" />
//     <div class="info">
//         <p class="info-item">
//             <b>Likes</b>
//         </p>
//             <p class="info-item">
//         <b>Views</b>
//         </p>
//         <p class="info-item">
//             <b>Comments</b>
//         </p>
//         <p class="info-item">
//             <b>Downloads</b>
//         </p>
//     </div>
// </div>

// ✅Submit handler
// Api fetch photos
// Render markup
// On image click
// Load more
// Infinity scroll

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchPhotos } from './js/api';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form#search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('div.gallery'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

const renderPhotosMarkup = photos => {
  console.log('photos:', photos);

  const markup = photos
    .map(photo => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = photo;

      return `
    <li class="photo-card">
        <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
            </p>
         </div>
    </li>`;
    })
    .join('');

  // erase gallery before rendering a new one
  refs.gallery.innerHTML = '';

  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

const onSubmit = async e => {
  e.preventDefault();

  // remove double whitespaces and trim input value
  const normalizedInputVal = e.target.elements['searchQuery'].value
    .replace(/\s+/g, ' ')
    .trim();

  refs.form.reset();

  try {
    const { hits, totalHits, query } = await fetchPhotos(normalizedInputVal);
    console.log('hits.length:', hits.length);

    if (!totalHits) {
      iziToast.warning({
        message: `Sorry, there are no images matching "${query}". Please try again`,
        position: 'topCenter',
        timeout: 4000,
      });
      return;
    }

    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
      position: 'topCenter',
      timeout: 1500,
    });

    renderPhotosMarkup(hits);
  } catch (error) {
    console.log(error);
  }
};

refs.form.addEventListener('submit', onSubmit);
