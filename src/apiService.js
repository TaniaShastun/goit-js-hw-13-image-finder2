import PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
const {success } = require('@pnotify/core');


const KEY = '20781739-e8c2f62c579f1f5662fd16aac';

export default function serviseApi(searchValue, pageNumber, callBack) {
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchValue}&page=${pageNumber}&per_page=12&key=${KEY}`;
  fetch(BASE_URL)
    .then(response => {
      return response.json();
    }) 
    .then(data => {
      callBack(data);
      
      success({
        title: 'NEW REUEST',
        text: 'Create new request',
      });
    })
    .catch(error => {
      console.error(error);
    });
}