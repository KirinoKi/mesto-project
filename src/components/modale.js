import { profilePopup, addPlacePopup } from "./index.js";
import { openPopup, closePopup } from "./utils.js";
import { addCard } from "./cards.js";
  
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

export { editProfile, submitProfileEdition, submitPlaceAdding };