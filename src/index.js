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

refs.seachForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onloadMore);
//refs.inputText.addEventListener('input', onSearch);

function onSearch(e) {
   e.preventDefault();
   
   imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
   //if (imagesApiService.searchQuery === '') { 
   //
   // }
   imagesApiService.resetPage();
   imagesApiService.fetchImages().then(elements => {
    clearImagesContainer();
    appendImagesMarkup(elements);
   });
  }
   
  function onloadMore() {
    imagesApiService.fetchImages().then(appendImagesMarkup);
  }

  function appendImagesMarkup(elements) {
    const markUp = elements.map(({
         webformatURL, 
          largeImageURL, 
          tags, 
          likes, 
          views,
          comments,
          downloads,
         }) =>{
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
       </div>`;
      }).join("");
   
         refs.galleryContainer.insertAdjacentHTML('beforeend', markUp);
         
        }   

//new SimpleLightbox('.gallery a', {
 //captions: true,
//captionsData: 'alt',
//captionDelay: 250,
//});


function clearImagesContainer () {

  refs.galleryContainer.innerHTML = '';

}