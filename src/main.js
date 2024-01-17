import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import throttle from 'lodash.throttle';

import {
  fetchPhotos,
  getCurrentPageCount,
  getCurrentQuery,
  per_page,
} from './js/api';
import {
  checkFetchStatus,
  disableElement,
  enableElement,
  hideElement,
  isNotEmpty,
  removeWhitespaces,
  showElement,
  goToTop,
  isEndOfResults,
} from './js/common';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

// TODO:
// ✅move all logic of handling the request outside of API
// ✅notification on first fetch, when there are less hits, than per_page
// edit styles of the image card
// edit styles of toTop button
// ✅smooth transition on hover and focus

const MODES = {
  loadMoreButton: 'Load More Button',
  infiniteScroll: 'Infinite Scroll',
};

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
let mode = null;
// let isEndOfResults = false;

const goToNextResults = () => {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
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

const onScroll = throttle(() => {
  if (window.scrollY >= 100) {
    showElement(refs.toTopBtn);
  } else {
    hideElement(refs.toTopBtn);
  }
}, 500);

const trackLastElement = throttle(() => {
  const body = document.body;
  const html = document.documentElement;
  const totalHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const pixelsToBottom = totalHeight - window.innerHeight - window.scrollY;

  if (pixelsToBottom < 300) {
    onLoadMore();
  }
}, 500);

const onInput = e => {
  const normalizedInputVal = removeWhitespaces(e.target.value);

  normalizedInputVal && normalizedInputVal.length >= 2
    ? enableElement(refs.submitBtn)
    : disableElement(refs.submitBtn);
};

const onSubmit = async e => {
  e.preventDefault();

  const inputVal = e.target.elements['searchQuery'].value;
  // remove double whitespaces and trim input value
  const normalizedInputVal = removeWhitespaces(inputVal);

  refs.form.reset();

  disableElement(refs.submitBtn);
  mode === MODES.loadMoreButton && hideElement(refs.loadMoreBtn);
  showElement(refs.loader);
  // erase gallery before fetching a new one
  clearMarkup(refs.gallery);

  try {
    const { data, status } = await fetchPhotos(normalizedInputVal);
    hideElement(refs.loader);
    checkFetchStatus(status);
    //   there is no data if we encounter Error 429 "Too many requests"
    if (!data) {
      return;
    }

    const { hits, totalHits } = data;
    const currentQuery = getCurrentQuery();
    if (!isNotEmpty(hits)) {
      iziToast.warning({
        message: `Sorry, there are no images matching "${currentQuery}". Please try another search`,
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
    window.addEventListener('scroll', onScroll);

    // LOGIC FOR INFINITE SCROLL
    if (mode === MODES.infiniteScroll) {
      if (isEndOfResults(totalHits)) {
        window.removeEventListener('scroll', trackLastElement);

        iziToast.warning({
          message: `You've reached the end of search results.`,
          position: 'topCenter',
          timeout: 2500,
        });
      } else {
        window.addEventListener('scroll', trackLastElement);
      }
      return;
    }

    // LOGIC FOR LOAD MORE BUTTON
    if (mode === MODES.loadMoreButton) {
      if (isEndOfResults(totalHits)) {
        hideElement(refs.loadMoreBtn);
        refs.loadMoreBtn.removeEventListener('click', onLoadMore);
        iziToast.warning({
          message: `You've reached the end of search results.`,
          position: 'topCenter',
          timeout: 2500,
        });
      } else {
        showElement(refs.loadMoreBtn);
        refs.loadMoreBtn.addEventListener('click', onLoadMore);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const onLoadMore = async () => {
  mode === MODES.loadMoreButton && hideElement(refs.loadMoreBtn);
  showElement(refs.loader);

  try {
    const currentQuery = getCurrentQuery();
    const { data, status } = await fetchPhotos(currentQuery);
    hideElement(refs.loader);
    checkFetchStatus(status);
    //   there is no data if we encounter Error 429 "Too many requests"
    if (!data) {
      return;
    }

    const { hits, totalHits } = data;
    renderPhotosMarkup(hits);
    goToNextResults();

    if (isEndOfResults(totalHits)) {
      window.removeEventListener('scroll', trackLastElement);
      refs.loadMoreBtn.removeEventListener('click', onLoadMore);

      setTimeout(() => {
        iziToast.warning({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topCenter',
          timeout: 3500,
        });
      }, 1000);

      mode === MODES.loadMoreButton && hideElement(refs.loadMoreBtn);
      return;
    }
    mode === MODES.loadMoreButton && showElement(refs.loadMoreBtn);
  } catch (error) {
    console.log(error);
  }
};

const chooseModeOnLoad = () => {
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    message: 'Which modes do you want to use?',
    position: 'center',
    buttons: [
      [
        `<button>${MODES.loadMoreButton}</button>`,
        function (instance, toast) {
          instance.hide(
            { transitionOut: 'fadeOut' },
            toast,
            `${MODES.loadMoreButton}`
          );
        },
      ],
      [
        `<button>${MODES.infiniteScroll}</button>`,
        function (instance, toast) {
          instance.hide(
            { transitionOut: 'fadeOut' },
            toast,
            `${MODES.infiniteScroll}`
          );
        },
      ],
    ],
    onClosed: function (instance, toast, closedBy) {
      mode = closedBy === 'timeout' ? `${MODES.loadMoreButton}` : `${closedBy}`;
    },
  });
};

chooseModeOnLoad();

refs.input.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);
refs.toTopBtn.addEventListener('click', goToTop);
