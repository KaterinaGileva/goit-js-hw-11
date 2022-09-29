import './css/styles.css';
//import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    seachForm: document.querySelector('.search-form'),
    //inputText: document.querySelector('#search-box'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector(".gallery"),
};

const imagesApiService = new ImagesApiService();
console.log(imagesApiService);

refs.seachForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onloadMore);
//refs.inputText.addEventListener('input', onSearch);

function onSearch(e) {
   e.preventDefault();
   console.log(imagesApiService.searchQuery);
   console.log(e.currentTarget.elements.searchQuery.value);
   imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
   console.log(imagesApiService.searchQuery);
   
   //if (imagesApiService.searchQuery === '') { 
   //
   // }
   imagesApiService.resetPage();
   imagesApiService.fetchImages();
   imagesApiService.fetchImages().then(hits => console.log("hits", hits));
    //clearImagesContainer();
    appendImagesMarkup(hits);
   //});
  }
   
  function onloadMore() {
    imagesApiService.fetchImages().then(hits => console.log(hits));
    //.then(appendImagesMarkup);
  }

  function appendImagesMarkup(hits) {
    const markup = hits.map(({
         webformatURL, 
          largeImageURL, 
          tags, 
          likes, 
          views,
          comments,
          downloads
         }) => {
         return `<div class="photo-card">
         <a class="gallery__item" href="${largeImageURL}">
         <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
         </a>
         <div class="info">
           <p class="info-item">
             <b>Likes:</b>${likes}
           </p>
           <p class="info-item">
             <b>Views:</b>${views}
           </p>
           <p class="info-item">
             <b>Comments:</b>${comments}
           </p>
           <p class="info-item">
             <b>Downloads:</b>${downloads}
           </p>
         </div>
       </div>`
      }).join("");
   
         refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
          //refs.galleryContainer.innerHTML = markup;
        }   

//new SimpleLightbox('.gallery a', {
 //captions: true,
//captionsData: 'alt',
//captionDelay: 250,
//});


function clearImagesContainer () {

  refs.galleryContainer.innerHTML = '';

}