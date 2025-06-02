export { createCard, likeIt, removeCard };
// @todo: Функция добавление карточек
const createCard = (
  cardTemplate,
  dataCard,
  likeIt,
  openImgFull,
  removeCard
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelCard = cardElement.querySelector(".card__delete-button");
  const btnLikeCard = cardElement.querySelector(".card__like-button");
  const imgCard = cardElement.querySelector(".card__image");
  const image = cardElement.querySelector(".card__image");
  const name = cardElement.querySelector(".card__title");
  image.src = dataCard.link;
  image.setAttribute("alt", dataCard.name);
  name.textContent = dataCard.name;
  btnDelCard.addEventListener("click", removeCard);
  btnLikeCard.addEventListener("click", likeIt);
  imgCard.addEventListener("click", openImgFull);
  return cardElement;
};
// @todo: Функция удаления карточки
const removeCard = (evt) => {
  evt.target.parentElement.remove();
};
// @todo: Функция лайка  карточки
const likeIt = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};
