import { addCard } from "./cards.js";
import { addPlacePopup, profilePopup } from "./utils.js";
import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modale.js";
import '../pages/index.css';

const editProfileForm = document.querySelector(`form[name='editPopup']`),
      addPlaceForm = document.querySelector(`form[name='addPopup']`),
      editProfileBtn = document.querySelector(`.lead__pencil`),
      addPlaceBtn = document.querySelector(`.lead__button`),
      closeProfilePopupBtn = document.querySelector(`button[name='popupCloseEdit']`),
      closeAddPopupBtn = document.querySelector(`button[name='popupCloseAdd']`),
      closeImagePopupBtn = document.querySelector(`button[name='popupCloseCard']`),
      closePopupBtns = Array.from(document.querySelectorAll(`.popup__close-cross`));


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

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

editProfileBtn.addEventListener( 'click', ()=> editProfile());
addPlaceBtn.addEventListener('click', ()=> openPopup(addPlacePopup));
editProfileForm.addEventListener('submit', submitProfileEdition);
addPlaceForm.addEventListener(`submit`, submitPlaceAdding);

closePopupBtns.forEach( (btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});


const inputName = document.querySelector(`input[name='userName']`),
        inputJob= document.querySelector(`input[name='userOccupation']`), 
        userName = document.querySelector(`.lead__title`),
        userJob = document.querySelector(`.lead__subtitle`),
        inputPlace = document.querySelector(`input[name='placeName']`),
        inputLink= document.querySelector(`input[name='placeLink']`);
  

  function editProfile() {
    inputName.value = userName.textContent;
    inputJob.value = userJob.textContent;
    openPopup(profilePopup)
  };

  function changeProfileName(nameValue, jobValue) {
    userName.textContent = nameValue;
    userJob.textContent = jobValue;
  }

  function submitProfileEdition (evt) {
    const nameValue = inputName.value,
          jobValue = inputJob.value;
  evt.preventDefault(); 
   changeProfileName(nameValue, jobValue)
   closePopup(profilePopup)
  };
    
  function submitPlaceAdding (evt) {
    evt.preventDefault();
    const placeValue = inputPlace.value,
          submitButton = evt.target.querySelector('.popup__submit'),
          linkValue = inputLink.value;
    addCard(placeValue, linkValue);
    closePopup(addPlacePopup)
    evt.target.reset();
    submitButton.classList.add('popup__submit_inactive');
    submitButton.setAttribute('disabled', true);
  };



enableValidation({
  popupSelector:'.popup',
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}); 