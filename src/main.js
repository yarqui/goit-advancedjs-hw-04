// ✅ toTopBtn
// ✅add loader?
// ✅Submit handler
// ✅Api fetch photos
// ✅Render markup
// ✅styles
// ✅On image click
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
  gallery: document.querySelector('ul.gallery'),
  submitBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('button.load-more'),
  toTopBtn: document.querySelector('.scroll-top-button'),
  loader: document.querySelector('span.loader'),
};

const lightbox = new SimpleLightbox('.photo-link');

const goToNextResults = () => {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const goToTop = () => {
  console.log('go to top');
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
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
          <a class="photo-link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="305" height="200" />
          </a>
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
  const markup = convertArrToPhotosMarkup(photos);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

const onScroll = () => {
  if (window.scrollY >= 100) {
    showElement(refs.toTopBtn);
    return;
  }
  hideElement(refs.toTopBtn);
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

    renderPhotosMarkup(hits);

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

  renderPhotosMarkup(hits);
  goToNextResults();

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

window.addEventListener('scroll', onScroll);

refs.input.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.toTopBtn.addEventListener('click', goToTop);
