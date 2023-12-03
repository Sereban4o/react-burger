import { setCookie } from "./utils";

const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const saveTokens = (refreshToken, accessToken) => {
  setCookie("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshTokenRequest = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};
