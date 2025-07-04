//@todo: конфиг для api запросов
const apiConfig = {
  address: "https://mesto.nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "c7ab8214-2bee-4203-ba47-dd7491a7e9b0",
    "Content-Type": "application/json",
  },
};

export const getInitialProfileData = () => {
  return fetch(`${apiConfig.address}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return fetch(`${apiConfig.address}/cards`, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const postDatdProfile = (nameProfileInput, aboutProfileInput) => {
  return fetch(`${apiConfig.address}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameProfileInput,
      about: aboutProfileInput,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const addNewCard = (nameCardInput, linkCardInput) => {
  return fetch(`${apiConfig.address}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameCardInput,
      link: linkCardInput,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCardApi = (cardId) => {
  return fetch(`${apiConfig.address}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const likeCardApi = (cardId) => {
  return fetch(`${apiConfig.address}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const dislikeCardApi = (cardId) => {
  return fetch(`${apiConfig.address}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const newAvatarApi = (linkNewAvatar) => {
  return fetch(`${apiConfig.address}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: linkNewAvatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
