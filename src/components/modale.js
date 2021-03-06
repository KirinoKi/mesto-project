const userName = document.querySelector(`.lead__title`),
userJob = document.querySelector(`.lead__subtitle`),
userAvatar = document.querySelector('.lead__image');

function renderUser(user){
  userName.textContent = user.name;
  userJob.textContent = user.about;
  userAvatar.src = user.avatar;
}

function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  popup.addEventListener('mousedown', closePopupWithMouse);
  document.addEventListener('keydown', closePopupWithEsc);
};
  
function closePopup(popup){
  popup.classList.remove(`popup_opened`);
  popup.removeEventListener('mousedown', closePopupWithMouse);
  document.removeEventListener('keydown', closePopupWithEsc);
};
  
function closePopupWithMouse(evt) {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};
  
function closePopupWithEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

export { openPopup, closePopup, renderUser, userName, userJob };