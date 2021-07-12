// import './sass/main.scss';
import  NewsImages from './js/pixabay-servise.js'

const newImages = new NewsImages();

const refs = {
  input: document.querySelector('.js-input'),
  container: document.querySelector('.search-form'),
};

refs.input.addEventListener('input',onSearch)

function onSearch(event) {
  // clearCardContainer();
  newImages.query = event.target.value;
  // if (!newImages.query) {
  //   showInfo();
  //   return;
  // }
  newImages.fetchImages().then(data => {
    console.log(data);
  })
  // fetchImages();
}