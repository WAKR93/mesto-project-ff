import { initialCards } from "./cards";
import '../pages/index.css';
import { addCard, liked, removeCard, newAddCard } from "./card";
import { closePopup, imageCardPopup } from "./modal"
export { cardTemplate, cardOnline, resetInputVal, 
         formNewCard, nameNewCard, linkNewCard, 
         imgElPopup, textImgElPopup, popupImage};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const page = document.querySelector('.page');
const nameProfile = document.querySelector('.profile__title');
const jopProfile = document.querySelector('.profile__description');
const cardOnline = document.querySelector('.places__list');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupArr = document.querySelectorAll('.popup');
const popupEditProfil = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const imgElPopup = popupImage.querySelector('.popup__image');
const textImgElPopup = popupImage.querySelector('.popup__caption');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jopInput = formElement.querySelector('.popup__input_type_description');
const resetInputVal = page.querySelectorAll('.popup__input');
const formNewCard = document.forms['new-place'];
const nameNewCard = formNewCard.elements['place-name'];
const linkNewCard = formNewCard.elements['link'];

// @todo: Функция редактирования профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jopProfile.textContent = jopInput.value;
  closePopup(document.querySelector('.popup_is-opened'));
};
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardOnline.append(addCard(element, liked, imageCardPopup));
});
// @todo: вызов модального окна профиля
btnEditProfile.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jopInput.value = jopProfile.textContent;
  popupEditProfil.classList.add('popup_is-opened');
});
// @todo: вызов модального окна карточки
btnAddCard.addEventListener('click', () => {
  popupNewCard.classList.add('popup_is-opened');
});
// @todo: закрытие модального окна кликом
popupArr.forEach((item) => {
  item.classList.add('popup_is-animated');
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || 
    evt.target.classList.contains('popup')) {
      closePopup(item);
    };
  });
});
// @todo: закрытие модального окна ESC
page.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
       closePopup(document.querySelector('.popup_is-opened'));
    };
  });
// @todo: кнопка сохранить в редакторе профиля
formElement.addEventListener('submit', handleFormSubmit);
// @todo: кнопка сохранить в редакторе карточки
formNewCard.addEventListener('submit', newAddCard);
// @todo: кнопка like в карточке
cardOnline.addEventListener('click', liked);
// @todo: нажатие на картинку карточки
cardOnline.addEventListener('click', imageCardPopup);