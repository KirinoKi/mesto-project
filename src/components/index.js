import { addCard, initialCards } from "./cards.js";
import { openPopup, closePopup } from "./utils.js";
import { enableValidation } from "./validate.js";
import { editProfile, submitProfileEdition, submitPlaceAdding } from "./modale.js";
import '../pages/index.css';

const root = document.querySelector(`.root`),
      profilePopup = root.querySelector(`.popup__edit`),
      addPlacePopup = root.querySelector(`.popup__add`),
      imagePopup = root.querySelector(`.popup__card`),
      editProfileForm = root.querySelector(`form[name='editPopup']`),
      addPlaceForm = root.querySelector(`form[name='addPopup']`),
      editProfileBtn = root.querySelector(`.lead__pencil`),
      addPlaceBtn = root.querySelector(`.lead__button`),
      closeProfilePopupBtn = root.querySelector(`button[name='popupCloseEdit']`),
      closeAddPopupBtn = root.querySelector(`button[name='popupCloseAdd']`),
      closeImagePopupBtn = root.querySelector(`button[name='popupCloseCard']`),
      closePopupBtns = Array.from(root.querySelectorAll(`.popup__close-cross`));

export{ root, imagePopup, profilePopup, addPlacePopup };

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

enableValidation({
  popupSelector:'.popup',
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}); 