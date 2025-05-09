// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardOnline = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard (dataCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = dataCard.link;
  cardElement.querySelector('.card__title').textContent = dataCard.name;  
  buttonRemove.addEventListener('click', function (evt) {
    removeCard(cardElement);
  });
  return cardElement;
}
// @todo: Функция удаления карточки
const removeCard = function (element) {
 element.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  cardOnline.append(addCard(element));
});
 
  