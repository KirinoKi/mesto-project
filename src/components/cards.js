import { imagePopup } from './index.js'
import { openPopup } from './utils.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

const photoCardTemplate = document.querySelector(`#template`).content;
const photoCards = document.querySelector(`.photo-grid`);
const popupImage = document.querySelector(`.popup__image`);
const popupCaption = document.querySelector(`.popup__caption`);

function createCard(cardName, cardImage) {

  const cardElement = photoCardTemplate.querySelector(`.photo-grid__card`).cloneNode(true);
  const photoCardImage = cardElement.querySelector(`.photo-grid__item`);
  const photoCardName = cardElement.querySelector(`.photo-grid__name-title`)
  photoCardImage.src = cardImage;
  photoCardImage.alt = cardName;
  photoCardName.textContent = cardName;

  const likeButton = cardElement.querySelector(`.photo-grid__heart`);
  likeButton.addEventListener('click', (evt)=> {
    evt.target.classList.toggle(`photo-grid__heart_active`);
  }); 

  const deleteButton = cardElement.querySelector(`.photo-grid__delete`);
  deleteButton.addEventListener('click',(evt)=> {
    cardElement.remove();
  });

  photoCardImage.addEventListener('click', (evt)=> {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  });

  return cardElement;
};

function addCard(cardName, cardImage) {
  const photoCard = createCard(cardName, cardImage);
  photoCards.prepend(photoCard);
};

export {addCard, initialCards};