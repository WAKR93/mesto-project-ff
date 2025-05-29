export { addCard, liked, removeCard, newAddCard };
import { cardTemplate, nameNewCard, linkNewCard, cardOnline} from ".";
import {closePopup} from "./modal";
// @todo: Функция добавление карточек
const addCard = (dataCard, liked, imageCardPopup) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  const image = cardElement.querySelector('.card__image');
  const name = cardElement.querySelector('.card__title');
  image.src = dataCard.link;
  image.setAttribute('alt', dataCard.name);
  name.textContent = dataCard.name;  
  buttonRemove.addEventListener('click', function (evt) {
    removeCard(cardElement);
  });
  return cardElement;
}
// @todo: Функция лайка  карточки
const liked = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
     evt.target.classList.toggle('card__like-button_is-active');
  }
};
// @todo: Функция создание карточки
const newAddCard = (evt) => {
  evt.preventDefault();
  const objCard = {};
  objCard.name = nameNewCard.value;
  objCard.link = linkNewCard.value;
  cardOnline.prepend(addCard(objCard));
  closePopup(document.querySelector('.popup_is-opened'));
  evt.target.reset();
};
// @todo: Функция удаления карточки
const removeCard = (element) => {
 element.remove();
}