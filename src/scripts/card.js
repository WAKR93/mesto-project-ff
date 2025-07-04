export { createCard, likeIt, removeCard };
//@todo: Функция добавление карточек
const createCard = (
  cardTemplate,
  dataCard,
  likeIt,
  openImgFull,
  removeCard,
  userId,
  deleteCardApi,
  dislikeCardApi,
  likeCardApi
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelCard = cardElement.querySelector(".card__delete-button");
  const btnLikeCard = cardElement.querySelector(".card__like-button");
  const valLikeCount = cardElement.querySelector(".card__like-count");
  const imgCard = cardElement.querySelector(".card__image");
  const image = cardElement.querySelector(".card__image");
  const name = cardElement.querySelector(".card__title");
  image.src = dataCard.link;
  image.setAttribute("alt", dataCard.name);
  name.textContent = dataCard.name;
  valLikeCount.textContent = dataCard.likes.length;
  dataCard.likes.forEach((data) => {
    if (data._id === userId) {
      btnLikeCard.classList.add("card__like-button_is-active");
    }
  });
  if (dataCard.owner._id === userId) {
    btnDelCard.addEventListener("click", removeCard(dataCard, deleteCardApi));
  } else {
    btnDelCard.remove();
  }
  btnLikeCard.addEventListener(
    "click",
    likeIt(dataCard, dislikeCardApi, likeCardApi, valLikeCount, btnLikeCard)
  );
  imgCard.addEventListener("click", openImgFull);
  return cardElement;
};
//@todo: Функция удаления карточки
const removeCard = (dataCard, deleteCardApi) => (evt) => {
  deleteCardApi(dataCard._id)
    .then(evt.target.closest('.card').remove())
    .catch((err) => {
      console.log(err);
    });
};
//@todo: Функция лайка  карточки
const likeIt = (dataCard, dislikeCardApi, likeCardApi, valCountLikes, btnLike ) => (evt) => {
  if (btnLike.classList.contains("card__like-button_is-active")) {
    dislikeCardApi(dataCard._id)
      .then((data) => {
        btnLike.classList.remove("card__like-button_is-active");
        valCountLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardApi(dataCard._id)
      .then((data) => {
        btnLike.classList.add("card__like-button_is-active");
        valCountLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
