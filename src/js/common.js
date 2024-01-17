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

export {
  showElement,
  hideElement,
  isNotEmpty,
  enableElement,
  disableElement,
  removeWhitespaces,
};
