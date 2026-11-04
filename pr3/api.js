// api.js — модуль для запитів (fetch) та парсингу JSON

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Власні класи помилок, щоб розрізняти типи збоїв
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class HttpError extends Error {
  constructor(status, statusText) {
    super(`Сервер повернув помилку ${status} ${statusText}`.trim());
    this.name = 'HttpError';
    this.status = status;
  }
}

export class JsonParseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'JsonParseError';
  }
}

// Завантажує список користувачів і повертає розібраний JSON (масив об'єктів)
export const fetchUsers = async (url = USERS_URL) => {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    // fetch кидає TypeError, коли немає мережі, DNS-помилка, CORS тощо
    throw new NetworkError(`Мережева помилка: ${err.message}`);
  }

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  // Спочатку читаємо відповідь як текст, щоб самостійно розібрати JSON
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new JsonParseError(`Невалідний JSON: ${err.message}`);
  }

  if (!Array.isArray(data)) {
    throw new JsonParseError('Очікувався масив користувачів, але отримано інший тип даних');
  }
  return data;
};
