const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const popupCard = document.querySelector('.popup__card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const buttonEdit = document.querySelector('.lead__pencil');
const buttonClose = document.querySelectorAll('.popup__close-cross');
const buttonAdd = document.querySelector('.lead__button');
const buttonLike = document.querySelectorAll('.photo-grid__heart');
const buttonDelete = document.querySelectorAll('.photo-grid__delete');
const formEdit = document.querySelector('.popup__profile');
const formAdd = document.querySelector('.popup__photo-grid');
const userName = document.querySelector('.popup__input-name');
const userOccupation = document.querySelector('.popup__input-subname');
const cardInputName = document.querySelector('.popup__input-title');
const cardInputPhoto = document.querySelector('.popup__input-link');
const profileName = document.querySelector('.lead__title');
const profileOccupation = document.querySelector('.lead__subtitle');
const cardsBlock = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#template').content;
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
function renderCard(placeValue, photoValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.photo-grid__name-title');
  const cardImage = cardElement.querySelector('.photo-grid__item');
  cardTitle.textContent = placeValue;
  cardImage.src = photoValue;
  cardImage.alt = placeValue;
  cardElement.querySelector('.photo-grid__heart').addEventListener('click', e => e.target.classList.toggle('photo-grid__heart_active'));
  cardElement.querySelector('.photo-grid__delete').addEventListener('click', e => {
    const cardItem = e.target.closest('.photo-grid__card');
    cardItem.remove();
  });
  cardImage.addEventListener('click', () => {
    popupImage.src = photoValue;
    popupImage.alt = placeValue;
    popupCaption.textContent = placeValue;
    openPopup(popupCard);
  });
  return cardElement;
}
initialCards.forEach((item) => {
  cardsBlock.append(renderCard(item.name, item.link));
})
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}
function changeProfileName(nameValue, jobValue) {
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;
}
buttonEdit.addEventListener('click', () => {
  userName.value = profileName.textContent;
  userOccupation.value = profileOccupation.textContent;
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonClose.forEach(btn => btn.addEventListener('click', e => closePopup(e.target.closest('.popup'))))
formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
  changeProfileName(userName.value, userOccupation.value);
  closePopup(popupEdit);
});
formAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  cardsBlock.prepend(renderCard(cardInputName.value, cardInputPhoto.value));
  closePopup(popupAdd);
  formAdd.reset();
});