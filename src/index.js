import './sass/main.scss';
import NewsImages from './js/pixabay-servise.js';
import 'material-icons/iconfont/material-icons.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const newImages = new NewsImages();
Notify.success('What are you looking for?:)');

const refs = {
  input: document.querySelector('.js-input'),
  form: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  searchBtn: document.querySelector('#search-btn'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

const clearGalleryContainer = () => {
  refs.galleryEl.innerHTML = '';
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
            <a class="photo-card" href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" width="310" height="230"  />
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
            </a>
          </li>`;
};

const createMarkupGallery = img => {
  const gallery = img.map(markupPhoto).join();
  refs.galleryEl.insertAdjacentHTML('afterbegin', gallery);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

const onFetchImages = () => {
  newImages
    .fetchImages()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      }

      refs.loadMoreBtn.classList.remove('is-hidden');
      createMarkupGallery(hits);
    })
    .catch(error => {
      console.log(error);

      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results.",
      );
    });
};

const onSearch = e => {
  e.preventDefault();
  const searchWord = e.currentTarget.elements.query.value.trim();
  newImages.query = searchWord;

  if (newImages.query === '') {
    clearGalleryContainer();
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.failure("You haven't written anything yet!!!");
    return;
  }
  newImages.resetPage();
  clearGalleryContainer();
  onFetchImages();
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onFetchImages);
