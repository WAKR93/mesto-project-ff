export { openPopup, closePopup };

// todo: Функция вызова модального окна
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEsc);
};
// @todo: Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEsc);
};
// todo: функция-обработчик события нажатия Esc
const pressEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};
