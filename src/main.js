// TODO: toTopBtn
// TODO: add loader?
// ✅Submit handler
// ✅Api fetch photos
// ✅Render markup
// styles
// On image click
// ✅Load more
// Infinity scroll

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import {
  fetchPhotos,
  getCurrentPageCount,
  getCurrentQuery,
  per_page,
} from './js/api';
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
  loader: document.querySelector('span.loader'),
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

const renderFirstPhotosMarkup = photos => {
  const markup = convertArrToPhotosMarkup(photos);

  // FIXME: ? DO WE NEED SEPARATE convertArr and this?
  // // erase gallery before rendering a new one
  // clearMarkup(refs.gallery);
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
  hideElement(refs.loadMoreBtn);
  showElement(refs.loader);
  // erase gallery before fetching a new one
  clearMarkup(refs.gallery);

  try {
    const data = await fetchPhotos(normalizedInputVal);
    hideElement(refs.loader);
    //   there is no data if we encounter Error 429 "Too many requests"
    if (!data) {
      return;
    }

    const { hits, totalHits, newQuery } = data;
    if (!isNotEmpty(hits)) {
      iziToast.warning({
        message: `Sorry, there are no images matching "${newQuery}". Please try another search`,
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

    renderFirstPhotosMarkup(hits);

    const page = getCurrentPageCount();
    const isEndOfResults = totalHits < page * per_page;
    isEndOfResults
      ? hideElement(refs.loadMoreBtn)
      : showElement(refs.loadMoreBtn);
  } catch (error) {
    console.log(error);
  }
};

const onLoadMore = async () => {
  const currentQuery = getCurrentQuery();
  hideElement(refs.loadMoreBtn);
  showElement(refs.loader);
  const data = await fetchPhotos(currentQuery);
  hideElement(refs.loader);
  //   there is no data if we encounter Error 429 "Too many requests"
  if (!data) {
    return;
  }

  const { hits, totalHits } = data;

  const markup = convertArrToPhotosMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const page = getCurrentPageCount();
  const isEndOfResults = totalHits < page * per_page;
  if (isEndOfResults) {
    setTimeout(() => {
      iziToast.warning({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topCenter',
        timeout: 3500,
      });
    }, 1000);

    hideElement(refs.loadMoreBtn);
    return;
  }
  showElement(refs.loadMoreBtn);
};

refs.input.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
