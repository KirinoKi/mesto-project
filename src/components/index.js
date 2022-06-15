import { createCards } from "./cards.js";
import { addPlacePopup, profilePopup, avatarPopup} from "./utils.js";
import { enableValidation } from "./validate.js";
import { openPopup, closePopup, renderUser, userName, userJob } from "./modale.js";
import { getUserInfo, getInitialCards, changeProfileData, postCardOnServe, changeUserAvatar } from "./api.js";
import '../pages/index.css';

let userId;

const editProfileForm = document.querySelector(`form[name='editPopup']`),
      addPlaceForm = document.querySelector(`form[name='addPopup']`),
      editProfileBtn = document.querySelector(`.lead__pencil`),
      addPlaceBtn = document.querySelector(`.lead__button`),
      submitAvatarChangeButton = document.querySelector(`form[name='userAvatar']`),
      changeAvatarButton = document.querySelector(`.lead__image-overlay`),
      closePopupBtns = Array.from(document.querySelectorAll(`.popup__close-cross`));


editProfileBtn.addEventListener( 'click', ()=> editProfile());
addPlaceBtn.addEventListener('click', ()=> openPopup(addPlacePopup));
editProfileForm.addEventListener('submit', submitProfileEdition);
addPlaceForm.addEventListener(`submit`, submitPlaceAdding);
changeAvatarButton.addEventListener('click', () => openPopup(avatarPopup));
submitAvatarChangeButton.addEventListener(`submit`, submitAvatarChange)

closePopupBtns.forEach( (btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
      userId = userData._id;
      renderUser(userData)
      createCards(cards, userId)
  })
  .catch(err => {
    console.log(err)
  });

const inputName = document.querySelector(`input[name='userName']`),
        inputJob= document.querySelector(`input[name='userOccupation']`), 
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
    evt.preventDefault(); 
    const nameValue = inputName.value,
           submitButton = evt.target.querySelector('.popup__submit'),
          jobValue = inputJob.value;
    renderLoading(true, submitButton)
    changeProfileData(nameValue, jobValue)
    .then((newUserData)=>{
      renderUser(newUserData)
      closePopup(profilePopup)
      submitButton.classList.add('popup__submit_inactive');
      submitButton.setAttribute('disabled', true);
    })
    .finally( () => {
       renderLoading(false, submitButton) 
      })
    .catch((err)=>{
      console.log(err)
    })
  };
    
  function submitPlaceAdding (evt) {
    evt.preventDefault();
  const placeValue = inputPlace.value,
        submitButton = evt.target.querySelector('.popup__submit'),
        linkValue = inputLink.value;
  renderLoading(true, submitButton)      
  postCardOnServe(placeValue, linkValue)
  .then((card)=>{
    addCard(card, userId)
    closePopup(addPlacePopup)
    evt.target.reset();
    submitButton.classList.add('popup__submit_inactive');
    submitButton.setAttribute('disabled', true);
  })
  .finally( () => {
    renderLoading(false, submitButton) 
   })
  .catch((err)=>{
    console.log(err)
  })
  };

  function submitAvatarChange(evt) {
    evt.preventDefault();
    const submitButton = evt.target.querySelector('.popup__submit'),
    avatarLinkValue = avatarLink.value;
    renderLoading(true, submitButton)
    changeUserAvatar(avatarLinkValue)
    .then((newUserAvatar)=>{
      renderUser(newUserAvatar)
      closePopup(avatarPopup)
      evt.target.reset();
      submitButton.classList.add('popup__submit_inactive');
      submitButton.setAttribute('disabled', true);
    })
    .finally( () => {
      renderLoading(false, submitButton) 
     })
    .catch((err)=>{
      console.log(err)
    })
  }

  function renderLoading(isLoading, submitButton){
    if(isLoading){
     submitButton.value = "Создание..."
      } else {
      submitButton.value = "Создать"
    }
  }

enableValidation({
  popupSelector:'.popup',
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
});

export { editProfile, submitProfileEdition, submitPlaceAdding, submitAvatarChange, renderLoading};