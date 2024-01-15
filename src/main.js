// ✅Submit handler
// ✅Api fetch photos
// ✅Render markup
// On image click
// ✅Load more
// Infinity scroll

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchPhotos, getCurrentQuery } from './js/api';
import {
  disableElement,
  enableElement,
  hideElement,
  isNotEmpty,
  showElement,
} from './js/common';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form#search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('div.gallery'),
  submitBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

const clearMarkup = element => {
  element.innerHTML = '';
};

const convertArrToPhotosMarkup = arr => {
  return (
    isNotEmpty(arr) &&
    arr
      .map(el => {
        const {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = el;

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
      .join('')
  );
};

const renderPhotosMarkup = photos => {
  console.log('photos:', photos);
  const markup = convertArrToPhotosMarkup(photos);
  // erase gallery before rendering a new one
  clearMarkup(refs.gallery);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

const onInput = e => {
  const inputValLength = e.target.value.length;
  inputValLength >= 2
    ? enableElement(refs.submitBtn)
    : disableElement(refs.submitBtn);
};

const onSubmit = async e => {
  e.preventDefault();

  const inputVal = e.target.elements['searchQuery'].value;

  // remove double whitespaces and trim input value
  const normalizedInputVal = inputVal.replace(/\s+/g, ' ').trim();

  refs.form.reset();
  disableElement(refs.submitBtn);

  try {
    const { hits, totalHits, query } = await fetchPhotos(normalizedInputVal);

    if (!isNotEmpty(hits)) {
      iziToast.warning({
        message: `Sorry, there are no images matching "${query}". Please try another search`,
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
    showElement(refs.loadMoreBtn);
  } catch (error) {
    console.log(error);
  }
};

const onLoadMore = async () => {
  const currentQuery = getCurrentQuery();
  const { hits, isEndOfResults } = await fetchPhotos(currentQuery);
  console.log('hits:', hits);

  const markup = convertArrToPhotosMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  if (isEndOfResults) {
    setTimeout(() => {
      iziToast.warning({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topCenter',
        timeout: 3500,
      });
    }, 1000);

    hideElement(refs.loadMoreBtn);
  }
};

// TODO: add event listener on input with cb, that checks whether input is empty. if it is empty iziToast about it
// TODO: toTopBtn
refs.input.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
