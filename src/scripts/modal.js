import { resetInputVal, nameInput, jopInput, nameProfile, jopProfile } from '.';
export {openPopup, closePopup };

// todo: Функция вызова модального окна
const openPopup = (popup, evt) => {
  if (popup.className.includes('popup_type_edit')) {
      nameInput.value = nameProfile.textContent;
      jopInput.value = jopProfile.textContent;
  }
  popup.classList.add('popup_is-opened');
};

// @todo: Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  resetInputVal.forEach((item) => {
    item.value = '';
  });
};