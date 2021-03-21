import './styles.css';
import pixabayApiData from './apiService';
import imageList from './template/image-list.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';

const ulListImage = document.querySelector('#image-list');
ulListImage.addEventListener('click', originImageShow);
const classBtn = document.querySelector('#classBtn');
classBtn.addEventListener('click', onClickBtn);
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', submitForm);
const choiseInput = document.querySelector('#input');

import PNotify from '@pnotify/core/dist/PNotify.js';
//import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '@pnotify/core/dist/BrightTheme.css';

function parseData(data) {
  const rezult = imageList(data);

  ulListImage.insertAdjacentHTML('beforeend', rezult);
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

let currentPage = 0;
function submitForm(event) {
  event.preventDefault();
  onClickBtn();
}

let reSearch;
function onClickBtn() {
  if (reSearch !== choiseInput.value) {
    clearInput();
    currentPage = 0;
    reSearch = choiseInput.value;
  }
  pixabayApiData(choiseInput.value, ++currentPage, parseData);
  console.log(`Page number ---- ${currentPage}`);
}

function originImageShow(event) {
  let clickImage = event.target;
  console.dir(clickImage);
  if (clickImage.tagName === 'IMG') {
    const instance = basicLightbox.create(
      `<img src="${clickImage.dataset.origin}">`,
    );
    instance.show();
  }
}

const btnToTop = document.querySelector('#fix-button');
btnToTop.addEventListener('click', backToTop);

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function clearInput() {
  ulListImage.innerHTML = '';
}
