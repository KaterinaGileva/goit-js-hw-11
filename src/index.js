import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from './load-more-btn';

const refs = {
    seachForm: document.querySelector('.search-form'),
    //loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector(".gallery"),
};
let hitSumm = 0;
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiService = new ImagesApiService();
     console.log(imagesApiService);

loadMoreBtn.disable();

refs.seachForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onloadMore);

function onSearch(e) {
   e.preventDefault();
   imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
   
   if (imagesApiService.searchQuery === '') {

    return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }

   loadMoreBtn.show();
   imagesApiService.resetPage();
    clearImagesContainer();
    fetchImages(); 
   }
  
  function fetchImages(){
       loadMoreBtn.disable();
       imagesApiService.fetchImages().then(hits => {
       appendImagesMarkup(hits);
       loadMoreBtn.enable();

      if (!hits.length) {
        Notify.warning(`Sorry, there are no images matching your search query. Please try again.`);
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
      };  

      appendImagesMarkup(hits);
      
      hitSumm += hits.length;

    if (hitSumm < total) {
    
        Notify.success(`Hooray! We found ${total} images !!!`);   
        refs.loadMoreBtn.classList.remove('is-hidden');
    }
    
    if (hitSumm >= total) {
        Notify.info(
            'We re sorry, but you have reached the end of search results.'
        );
    }
  })
  }

  function onloadMore() {
    imagesApiService.fetchImages().then(appendImagesMarkup);
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
         return `
         <div class="photo-card">
         <a class="gallery__item" href="${largeImageURL}">
         <img class="photo-img" src="${webformatURL}" alt="${tags}"  width = "320" height = "270" loading="lazy"/>
         </a>
         <div class="info">
           <p class="info-item">
             <b>Likes</b>${likes}
           </p>
           <p class="info-item">
             <b>Views</b>${views}
           </p>
           <p class="info-item">
             <b>Comments</b>${comments}
           </p>
           <p class="info-item">
             <b>Downloads</b>${downloads}
           </p>
         </div>
       </div>
       `
      }).join("");
   
         refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
         lightbox.refresh();
        }   

  let lightbox = new SimpleLightbox('.gallery a', {
          captions: true,
          captionsData: 'alt',
          captionDelay: 250,
        });

function clearImagesContainer () {
       refs.galleryContainer.innerHTML = '';
}