import { imagePopup } from './utils.js'
import { openPopup, userName } from './modale.js'
import { loveTheCard, hateTheCard, kickCardFromServe } from './api.js';;


const photoCardTemplate = document.querySelector(`#template`).content;
const photoCards = document.querySelector(`.photo-grid`);
const popupImage = document.querySelector(`.popup__image`);
const popupCaption = document.querySelector(`.popup__caption`);

function createCard(card, userID) {

  const checkOwner = (likeElement) => likeElement.name === userID;
  const cardElement = photoCardTemplate.querySelector(`.photo-grid__card`).cloneNode(true);
  const photoCardImage = cardElement.querySelector(`.photo-grid__item`);
  const photoCardName = cardElement.querySelector(`.photo-grid__name-title`);
  const likeButton = cardElement.querySelector(`.photo-grid__heart`);
  const photoCardLikes = cardElement.querySelector(`.photo-grid__likes`);

  photoCardImage.src = card.link;
  photoCardImage.alt = card.name;
  photoCardName.textContent = card.name;

  if(card.likes.length > 0 && card.likes.some(checkOwner)) {
    likeButton.classList.add('photo-grid__heart_active');
  }

  photoCardLikes.textContent = card.likes.length;

  likeButton.addEventListener('click', (evt)=> {
    if(evt.target.classList.contains(`photo-grid__heart_active`)) {
      hateTheCard(card._id, photoCardLikes)
      .then((data)=>{
        evt.target.classList.remove(`photo-grid__heart_active`)
        photoCardLikes.textContent = data.likes.length;  
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      loveTheCard(card._id, photoCardLikes)
      .then((data)=>{
        evt.target.classList.add(`photo-grid__heart_active`)
        photoCardLikes.textContent = data.likes.length;
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }); 

  const deleteButton = cardElement.querySelector(`.photo-grid__delete`);
  if(card.owner._id === userID){
    deleteButton.classList.add('photo-grid__delete_active')
  }
  deleteButton.addEventListener('click',(evt)=> {
    kickCardFromServe(card._id)
    .then(()=>{
      cardElement.remove()
    })
    .catch(err => {
      console.log(err)
    });  
  });

  photoCardImage.addEventListener('click', (evt)=> {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  });

  return cardElement;
};

function addCard(card, userID) {
  const photoCard = createCard(card, userID);
  photoCards.prepend(photoCard);
};

function createCards(cards, userID){
  cards.forEach((card) => {
  addCard(card, userID);
});
}

function setLikesCounter(likesCount, photoCardLikes){
  photoCardLikes.textContent = likesCount;
}

export { addCard, createCards, setLikesCounter };