//@todo: конфиг для api запросов
const apiConfig = {
  address: "https://mesto.nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "c7ab8214-2bee-4203-ba47-dd7491a7e9b0",
    "Content-Type": "application/json",
  },
};
const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getInitialProfileData = () => {
  return fetch(`${apiConfig.address}/users/me`, {
    headers: apiConfig.headers,
  }).then(getResponseData);
};

export const getInitialCards = () => {
  return fetch(`${apiConfig.address}/cards`, {
    headers: apiConfig.headers,
  }).then(getResponseData);
};

export const postDatdProfile = (nameProfileInput, aboutProfileInput) => {
  return fetch(`${apiConfig.address}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameProfileInput,
      about: aboutProfileInput,
    }),
  }).then(getResponseData);
};

export const addNewCard = (nameCardInput, linkCardInput) => {
  return fetch(`${apiConfig.address}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameCardInput,
      link: linkCardInput,
    }),
  }).then(getResponseData);
};

export const deleteCardApi = (cardId) => {
  return fetch(`${apiConfig.address}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponseData);
};

export const likeCardApi = (cardId) => {
  return fetch(`${apiConfig.address}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(getResponseData);
};

export const dislikeCardApi = (cardId) => {
  return fetch(`${apiConfig.address}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponseData);
};

export const newAvatarApi = (linkNewAvatar) => {
  return fetch(`${apiConfig.address}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: linkNewAvatar,
    }),
  }).then(getResponseData);
};