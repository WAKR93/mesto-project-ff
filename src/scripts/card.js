export { addCard, likeIt, removeCard, createCard };
import { closePopup } from "./modal";
// @todo: Функция добавление карточек
const addCard = (cardTemplate, dataCard, likeIt, openImgFull) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const name = cardElement.querySelector(".card__title");
  image.src = dataCard.link;
  image.setAttribute("alt", dataCard.name);
  name.textContent = dataCard.name;
  return cardElement;
};
// @todo: Функция создание карточки
const createCard =
  (cardTemplate, cardOnline, nameNewCard, linkNewCard, popupNewCard) =>
  (evt) => {
    evt.preventDefault();
    const objCard = {};
    objCard.name = nameNewCard.value;
    objCard.link = linkNewCard.value;
    cardOnline.prepend(addCard(cardTemplate, objCard));
    closePopup(popupNewCard);
  };
// @todo: Функция удаления карточки
const removeCard = (evt) => {
  if (evt.target.classList.contains("card__delete-button")) {
    evt.target.parentElement.remove();
  }
};
// @todo: Функция лайка  карточки
const likeIt = (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};
