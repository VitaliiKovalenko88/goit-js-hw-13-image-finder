import './sass/main.scss';
import NewsImages from './js/pixabay-servise.js';
import { debounce } from 'lodash';
import 'material-icons/iconfont/material-icons.css';
const newImages = new NewsImages();

const refs = {
  input: document.querySelector('.js-input'),
  form: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  searchBtn: document.querySelector('#search-btn'),
  loadBtn: document.querySelector('.load-more-btn'),
};

function onSearch(e) {
  e.preventDefault();
  // clearCardContainer();
  newImages.query = e.currentTarget.elements.query.value;
  console.log(newImages.query);
  // if (!newImages.query) {
  //   showInfo();
  //   return;
  // }

  fetchImages();
}

const clearGalleryContainer = () => {
  refs.gallery.innerHTML = '';
};

const markupPhoto = ({
  webformatURL,
  likes,
  views,
  comments,
  downloads,
  largeImageURL,
  tags,
}) => {
  return `<li class="images-item">
            <div class="photo-card">
              <img src="${webformatURL}" alt="${tags}" width="360" height="250" data-large-img-src="${largeImageURL}" />
                <div class="stats">
                 <p class="stats-item">
                  <i class="material-icons">thumb_up</i>
                  ${likes}
                 </p>
                 <p class="stats-item">
                  <i class="material-icons">visibility</i>
                   ${views}
                 </p>
                 <p class="stats-item">
                  <i class="material-icons">comment</i>
                   ${comments}
                 </p>
                 <p class="stats-item">
                  <i class="material-icons">cloud_download</i>
                   ${downloads}
                 </p>
                </div>
            </div>
          </li>`;
};

const createMarkupGallery = img => {
  const gallery = img.map(markupPhoto).join();
  refs.galleryEl.insertAdjacentHTML('afterbegin', gallery);
};

const fetchImages = () => {
  newImages.fetchImages().then(data => {
    createMarkupGallery(data);
    console.log(data);
  });
};

refs.form.addEventListener('submit', debounce(onSearch, 500));
