const BaseUrl = "https://auth.nomoreparties.co";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register(email, password) {
  return fetch(`${BaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

export function login(email, password) {
  return fetch(`${BaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
}

export function checkToken(token) {
  return fetch(`${BaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
}