const API_KEY = '22469389-b601f8ee0455705c879309776'
const BASE_URL = 'https://pixabay.com/api/'

export default class NewsImages {
  constructor() {
    this.searchQuery = '';
    this.page=1
  }

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
    .then(console.log)
    
  }

  get(query) {
    return this.searchQuery
  }

  set(newQuery) {
    this.searchQuery=newQuery
  }
}
