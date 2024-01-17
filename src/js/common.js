import iziToast from 'izitoast';
import { getCurrentPageCount, per_page } from './api';

const CLASSES = {
  hidden: 'visually-hidden',
};

const ATTRIBUTES = {
  disabled: 'disabled',
};

const showElement = el => {
  el.classList.remove(CLASSES.hidden);
};

const hideElement = el => {
  el.classList.add(CLASSES.hidden);
};

const enableElement = el => {
  el.removeAttribute(ATTRIBUTES.disabled);
};

const disableElement = el => {
  el.setAttribute(ATTRIBUTES.disabled, '');
};

const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;

const removeWhitespaces = str => str.replace(/\s+/g, ' ').trim();

const checkFetchStatus = status => {
  if (status === 429) {
    iziToast.warning({
      message: 'Too many requests. Limit exceeded. Try again later',
      position: 'topCenter',
      timeout: 8000,
    });

    throw new Error('Too many requests. Limit exceeded. Try again later');
  }
};

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const isEndOfResults = totalHits => {
  const page = getCurrentPageCount();
  return totalHits < page * per_page;
};

export {
  showElement,
  hideElement,
  isNotEmpty,
  enableElement,
  disableElement,
  removeWhitespaces,
  checkFetchStatus,
  goToTop,
  isEndOfResults,
};
