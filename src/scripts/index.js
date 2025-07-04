import "../pages/index.css";
import { createCard, likeIt, removeCard } from "./card";
import { openPopup, closePopup } from "./modal";
import { enabledValidation, clearValidation } from "./validation";
import {
  getInitialCards,
  getInitialProfileData,
  postDatdProfile,
  addNewCard,
  deleteCardApi,
  dislikeCardApi,
  likeCardApi,
  newAvatarApi,
} from "./api";

let userId = null;

//@todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//@todo: DOM узлы
const page = document.querySelector(".page .page__content");
const btnEditProfile = page.querySelector(".profile__edit-button");
const btnAddCard = page.querySelector(".profile__add-button");
const nameProfile = page.querySelector(".profile__title");
const jopProfile = page.querySelector(".profile__description");
const avatarProfile = page.querySelector(".profile__image");
const cardOnline = page.querySelector(".places__list");
const popupArr = page.querySelectorAll(".popup");
const popupEditProfil = page.querySelector(".popup_type_edit");
const popupNewCard = page.querySelector(".popup_type_new-card");
const popupNewAvatar = page.querySelector(".popup_type_new-avatar");
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
const formNewAvatar = document.forms["new-avatar"];
const linkNewAvatar = formNewAvatar.elements["link-avatar"];
//@todo: конфиг для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//@todo: Лоадер 
const renderLoading = (isLoading, evt) => {
  const btnSave = evt.target.querySelector(".button");
  if(isLoading){
    btnSave.textContent = "Сохранение...";
  }
  else {
    btnSave.textContent = "Сохранить";
  }
};
//@todo: Функция запуска API
const startApi = () => {
  Promise.all([getInitialProfileData(), getInitialCards()])
    .then(([user, cards]) => {
      userId = user._id;
      addDataProfile(user);
      cards.forEach((card) => {
        cardOnline.append(
          createCard(
            cardTemplate,
            card,
            likeIt,
            openImgFull,
            removeCard,
            userId,
            deleteCardApi,
            dislikeCardApi,
            likeCardApi
          )
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//@todo: Функция смены аватарки
const changeAvatar = (Loading) => (evt) => {
  evt.preventDefault();
  Loading(true, evt);
  newAvatarApi(linkNewAvatar.value)
    .then((data) => {
      avatarProfile.setAttribute(
        "style",
        `background-image: url("${data.avatar}")`
      );
      closePopup(popupNewAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        Loading(false, evt);
    });
};
//@todo: Функция редактирования профиля
const handleProfileFormSubmit = (Loading) => (evt) => {
  evt.preventDefault();
  Loading(true, evt);
  postDatdProfile(nameInput.value, jopInput.value)
    .then((data) => {
      nameProfile.textContent = data.name;
      jopProfile.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        Loading(false, evt);
    });
  closePopup(document.querySelector(".popup_is-opened"));
};
//@todo: Функция вывода информации о пользователе на страницу
const addDataProfile = (userData) => {
  nameProfile.textContent = userData.name;
  jopProfile.textContent = userData.about;
  avatarProfile.setAttribute(
    "style",
    `background-image: url("${userData.avatar}")`
  );
};
//@todo: функция вкл. анимацией popup
const animatedPopup = () => {
  popupArr.forEach((item) => {
    item.classList.add("popup_is-animated");
  });
};
//@todo: функция обработчик модального окна с картинкой
const openImgFull = (evt) => {
  if (evt.target.classList.contains("card__image")) {
    imgElPopup.setAttribute("src", evt.target.src);
    imgElPopup.setAttribute("alt", evt.target.alt);
    textImgElPopup.textContent = `Название изображения ${evt.target.alt}`;
    openPopup(popupImage);
  }
};
//@todo: Функция создание карточки
const addCard =
  (
    cardTemplate,
    cardOnline,
    nameNewCard,
    linkNewCard,
    popup,
    closeCard,
    input,
    clInput,
    Loading
  ) =>
  (evt) => {
    evt.preventDefault();
    Loading(true, evt);
    addNewCard(nameNewCard.value, linkNewCard.value)
      .then((data) => {
        cardOnline.prepend(
          createCard(
            cardTemplate,
            data,
            likeIt,
            openImgFull,
            removeCard,
            userId,
            deleteCardApi,
            dislikeCardApi,
            likeCardApi
          )
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Loading(false, evt);
      });
    closeCard(popup);
    clInput(input);
  };
//@todo: Функция очистки input
const clearingInput = (input) => {
  input.forEach((item) => {
    item.value = "";
  });
};
//@todo: вызов модального окна смены аватарки
avatarProfile.addEventListener("click", () => {
  clearValidation(popupNewAvatar, validationConfig);
  clearingInput(resetInputVal);
  openPopup(popupNewAvatar);
});
//@todo: вызов модального окна профиля
btnEditProfile.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jopInput.value = jopProfile.textContent;
  clearValidation(popupEditProfil, validationConfig);
  openPopup(popupEditProfil);
});
//@todo: вызов модального окна создания карточки
btnAddCard.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  clearingInput(resetInputVal);
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
//@todo: кнопка сохранить в попап смены аватарки
formNewAvatar.addEventListener("submit", changeAvatar(renderLoading));
//@todo: кнопка сохранить в редакторе профиля
profileFormElement.addEventListener("submit", handleProfileFormSubmit(renderLoading));
//@todo: кнопка сохранить в редакторе карточки
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
    clearingInput,
    renderLoading
  )
);
//@todo: вкл. анимации popup
animatedPopup();
//@todo: вкл. валидации
enabledValidation(validationConfig);
//@todo: старт API
startApi();
