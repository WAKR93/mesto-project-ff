import { initialCards } from "./cards";
import '../pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const page = document.querySelector('.page');
const cardOnline = document.querySelector('.places__list');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupArr = document.querySelectorAll('.popup');
const popupEditProfil = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jopInput = formElement.querySelector('.popup__input_type_description');
//const nameNewCard = document.querySelector();
//const linkNewCard = document.querySelector();
// @todo: Функция редактирования профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const nameProfile = document.querySelector('.profile__title');
  const jopProfile = document.querySelector('.profile__description');
  nameProfile.textContent = nameInput.value;
  jopProfile.textContent = jopInput.value;
};
// @todo: Функция создания карточки
const addCard = (dataCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = dataCard.link;
  cardElement.querySelector('.card__title').textContent = dataCard.name;  
  buttonRemove.addEventListener('click', function (evt) {
    removeCard(cardElement);
  });
  return cardElement;
}
// @todo: Функция удаления карточки
const removeCard = (element) => {
 element.remove();
}
// @todo: Функция добавления карточки
const newAddCard = (name, link) => {
  const objCard = {};
  objCard.name = name;
  objCard.link = link;
  console.log(objCard);
};
// @todo: Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
};
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardOnline.append(addCard(element));
});
// @todo: закрытие модального окна кликом
popupArr.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || 
    evt.target.classList.contains('popup')) {
      closePopup(item);
    };
  });
});
// @todo: закрытие модального окна ESC
page.addEventListener('keydown', (evt) => {
    console.log(evt.key)
    if(evt.key === 'Escape') {
       closePopup(document.querySelector('.popup_is-opened'));
    };
  });
// @todo: вызов модального окна профиля
btnEditProfile.addEventListener('click', () => {
  popupEditProfil.classList.add('popup_is-opened');
});
// @todo: вызов модального окна карточки
btnAddCard.addEventListener('click', () => {
  popupNewCard.classList.add('popup_is-opened');
});
// @todo: кнопка сохранить в редакторе профиля
formElement.addEventListener('submit', handleFormSubmit);
//formElement.addEventListener('submit', newAddCard());