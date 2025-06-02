import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, likeIt, removeCard } from "./card";
import { openPopup, closePopup, pressEsc } from "./modal";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const page = document.querySelector(".page .page__content");
const btnEditProfile = page.querySelector(".profile__edit-button");
const btnAddCard = page.querySelector(".profile__add-button");
const nameProfile = page.querySelector(".profile__title");
const jopProfile = page.querySelector(".profile__description");
const cardOnline = page.querySelector(".places__list");
const popupArr = page.querySelectorAll(".popup");
const popupEditProfil = page.querySelector(".popup_type_edit");
const popupNewCard = page.querySelector(".popup_type_new-card");
const popupImage = page.querySelector(".popup_type_image");
const imgElPopup = popupImage.querySelector(".popup__image");
const textImgElPopup = popupImage.querySelector(".popup__caption");
const profileFormElement = page.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jopInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);
const resetInputVal = page.querySelectorAll(".popup__input");
const formNewCard = document.forms["new-place"];
const nameNewCard = formNewCard.elements["place-name"];
const linkNewCard = formNewCard.elements["link"];

// @todo: Функция редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jopProfile.textContent = jopInput.value;
  closePopup(document.querySelector(".popup_is-opened"));
};
// todo: функция управления анимацией popup
const animatedPopup = () => {
  popupArr.forEach((item) => {
    item.classList.add("popup_is-animated");
  });
};
// todo: функция обработчик модального окна с картинкой
const openImgFull = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    imgElPopup.setAttribute("src", evt.target.src);
    imgElPopup.setAttribute("alt", evt.target.alt);
    textImgElPopup.textContent = evt.target.alt;
    openPopup(popupImage);
  }
};
// @todo: Функция создание карточки
const addCard =
  (
    cardTemplate,
    cardOnline,
    nameNewCard,
    linkNewCard,
    popup,
    closeCard,
    input,
    clInput
  ) =>
  (evt) => {
    evt.preventDefault();
    const objCard = {};
    objCard.name = nameNewCard.value;
    objCard.link = linkNewCard.value;
    cardOnline.prepend(
      createCard(cardTemplate, objCard, likeIt, openImgFull, removeCard)
    );
    closeCard(popup);
    clInput(input);
  };
// @todo: Функция очистки input
const clearingInput = (input) => {
  input.forEach((item) => {
    item.value = "";
  });
};
// todo: вызов модального окна профиля
btnEditProfile.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jopInput.value = jopProfile.textContent;
  openPopup(popupEditProfil);
});
// todo: вызов модального окна создания карточки
btnAddCard.addEventListener("click", () => {
  openPopup(popupNewCard);
});
// @todo: закрытие модального окна кликом
popupArr.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(item);
    }
  });
});
// @todo: кнопка сохранить в редакторе профиля
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
// @todo: кнопка сохранить в редакторе карточки
formNewCard.addEventListener(
  "submit",
  addCard(
    cardTemplate,
    cardOnline,
    nameNewCard,
    linkNewCard,
    popupNewCard,
    closePopup,
    resetInputVal,
    clearingInput
  )
);
// todo: вкл. анимации popup
animatedPopup();
// @todo: вывод карточек на страницу
initialCards.forEach((element) => {
  cardOnline.append(
    createCard(cardTemplate, element, likeIt, openImgFull, removeCard)
  );
});
