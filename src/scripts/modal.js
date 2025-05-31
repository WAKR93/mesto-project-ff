export { openPopup, closePopup, pressEsc };

// todo: Функция вызова модального окна
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
};
// @todo: Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
};
// todo: функция-обработчик события нажатия Esc
const pressEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
    document.removeEventListener("keydown", pressEsc);
  }
};
