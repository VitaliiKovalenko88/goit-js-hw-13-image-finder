import './sass/main.scss';
import  NewsImages from './js/pixabay-servise.js'
import { debounce } from 'lodash';
const newImages = new NewsImages();

const refs = {
  input: document.querySelector('.js-input'),
  container: document.querySelector('.search-form'),
};

refs.input.addEventListener('input',debounce(onSearch, 500) )

function onSearch(event) {
  event.preventDefault();
  // clearCardContainer();
  newImages.query = event.target.value;
  // if (!newImages.query) {
  //   showInfo();
  //   return;
  // }

  fetchImages();
}

function fetchImages() {
  newImages.fetchImages().then(data => {
    console.log(data);
  })
}