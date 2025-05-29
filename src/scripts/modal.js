import { resetInputVal, imgElPopup, textImgElPopup, popupImage} from '.';
export { closePopup, imageCardPopup };


// @todo: Функция вызова popup картинки карточки
const imageCardPopup = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    imgElPopup.setAttribute('src', evt.target.src);
    imgElPopup.setAttribute('alt', evt.target.alt);
    textImgElPopup.textContent = evt.target.alt;
    popupImage.classList.add('popup_is-opened');
  }
};
// @todo: Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  resetInputVal.forEach((item) => {
    item.value = '';
  });
};