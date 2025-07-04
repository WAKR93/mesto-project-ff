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
    btnDelCard.classList.remove("crad__delete-button-no-active");
    btnDelCard.addEventListener("click", removeCard(dataCard, deleteCardApi));
  } else {
    btnDelCard.classList.add("crad__delete-button-no-active");
    btnDelCard.removeEventListener(
      "click",
      removeCard(dataCard, deleteCardApi)
    );
  }
  btnLikeCard.addEventListener(
    "click",
    likeIt(dataCard, dislikeCardApi, likeCardApi)
  );
  imgCard.addEventListener("click", openImgFull);
  return cardElement;
};
//@todo: Функция удаления карточки
const removeCard = (dataCard, deleteCardApi) => (evt) => {
  evt.target.parentElement.remove();
  deleteCardApi(dataCard._id)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//@todo: Функция лайка  карточки
const likeIt = (dataCard, dislikeCardApi, likeCardApi) => (evt) => {
  const valCountLikes =
    evt.target.parentElement.querySelector(".card__like-count");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    dislikeCardApi(dataCard._id)
      .then((data) => {
        evt.target.classList.remove("card__like-button_is-active");
        valCountLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardApi(dataCard._id)
      .then((data) => {
        evt.target.classList.add("card__like-button_is-active");
        valCountLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
