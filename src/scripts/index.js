import { initialCards } from "./cards";
import '../pages/index.css';
import { addCard, liked, removeCard, newAddCard } from "./card";
import { openPopup, closePopup } from "./modal"
export { cardTemplate, cardOnline, resetInputVal, 
         formNewCard, nameNewCard, linkNewCard, 
         imgElPopup, textImgElPopup, popupImage, 
         nameInput, jopInput, nameProfile, jopProfile};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const page = document.querySelector('.page .page__content');
const btnPage = page.querySelectorAll('.content button');
const nameProfile = page.querySelector('.profile__title');
const jopProfile = page.querySelector('.profile__description');
const cardOnline = page.querySelector('.places__list');

const popupArr = page.querySelectorAll('.popup');



const popupEditProfil = page.querySelector('.popup_type_edit');
const popupNewCard = page.querySelector('.popup_type_new-card');
const popupImage = page.querySelector('.popup_type_image');

const imgElPopup = popupImage.querySelector('.popup__image');
const textImgElPopup = popupImage.querySelector('.popup__caption');


const formElement = page.querySelector('.popup__form');
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
// tofo: колбэк вызова модального окна изображения
const imgOpen = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    imgElPopup.setAttribute('src', evt.target.src);
    imgElPopup.setAttribute('alt', evt.target.alt);
    textImgElPopup.textContent = evt.target.alt;
    openPopup(popupImage)
  }
};
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardOnline.append(addCard(element, liked, imgOpen));
});
// todo: вызов модального окна профиля и карточки
btnPage.forEach((item) => {
  item.addEventListener('click', (evt) => {
  if (evt.target.className === 'profile__edit-button') {
    openPopup(popupEditProfil);
  }
  else if (evt.target.className === 'profile__add-button') {
    openPopup(popupNewCard);
  }})
});
// @todo: нажатие на картинку карточки
cardOnline.addEventListener('click', imgOpen);
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