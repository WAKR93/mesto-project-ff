import { initialCards } from "./cards";
import '../pages/index.css';
import { addCard, likeIt, removeCard, createCard } from "./card";
import { openPopup, closePopup, pressEsc } from "./modal"
//export {cardTemplate, nameNewCard, linkNewCard, cardOnline, popupNewCard};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const page = document.querySelector('.page .page__content');
const btnEditProfile = page.querySelector('.profile__edit-button');
const btnCreateCard = page.querySelector('.profile__add-button');
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
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardOnline.append(addCard(cardTemplate, element, likeIt, openImgFull));
});
// todo: функция управления анимацией popup
const animatedPopup = () => {
  popupArr.forEach((item) => {item.classList.add('popup_is-animated');});
};
// @todo: функция добавления закрытие модального окна ESC
const addCloseEsc = () => {
  document.addEventListener('keydown', pressEsc);
}

const openImgFull = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    imgElPopup.setAttribute('src', evt.target.src);
    imgElPopup.setAttribute('alt', evt.target.alt);
    textImgElPopup.textContent = evt.target.alt;
    openPopup(popupImage);
    addCloseEsc();
  }
};
animatedPopup();
// todo: вызов модального окна профиля
btnEditProfile.addEventListener('click', () => {
      nameInput.value = nameProfile.textContent;
      jopInput.value = jopProfile.textContent;
      openPopup(popupEditProfil);
      addCloseEsc();
    });
// todo: вызов модального окна создания карточки
btnCreateCard.addEventListener('click', () => {
       openPopup(popupNewCard);
       addCloseEsc();
    });
// @todo: вызов модального окна с картинкой
cardOnline.addEventListener('click', openImgFull);
// @todo: закрытие модального окна кликом
popupArr.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') ||
      evt.target.classList.contains('popup')) {
      closePopup(item);
      resetInputVal.forEach((item) => {
        item.value = '';
      });
    };
  });
});
// @todo: кнопка сохранить в редакторе профиля
formElement.addEventListener('submit', handleFormSubmit);
// @todo: кнопка сохранить в редакторе карточки
formNewCard.addEventListener('submit', createCard(cardTemplate, cardOnline, nameNewCard, linkNewCard, popupNewCard) );
// @todo: кнопка like в карточке
cardOnline.addEventListener('click', likeIt);
// @todo: кнопка delete в карточке
cardOnline.addEventListener('click', removeCard);