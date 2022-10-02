 //import axios from "axios";
 const API_KEY = '30239587-3f20dad8b68c1db6bb7cff5e0';
 const BASE_URL = 'https://pixabay.com/api';
 
 export default class ImagesApiService { 
constructor () {
this.searchQ = "";
this.page = 1;
this.PER_PAGE = 40;
}
fetchImages() {
  console.log ("до запроса", this);
  const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQ}&page=${this.page}&per_page=${this.PER_PAGE}&image_type=photo&orientation=${this.horizontal}&safesearch${this.true}`;

   return fetch(url)
    .then(response => response.json())
    .then(({ hits }) => {
      console.log(hits)
    this.incrementPage();
     console.log("если ок", this)
     return hits;
    });
};

incrementPage() {
  this.page += 1;
}
  
resetPage() {
  this.page = 1;
}

get searchQuery() {
return this.searchQ;
}

set searchQuery(newQuery){
  this.searchQ = newQuery;
  }
}