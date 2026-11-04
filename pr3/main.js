// main.js — головний файл: імпорт модулів та виклик функцій
import { fetchUsers, NetworkError, HttpError, JsonParseError } from './api.js';
import { filterByCity, sortByName, getCities, toSimpleUser, formatUser } from './utils.js';

const DEFAULT_CITY = 'Gwenborough';
const inBrowser = typeof document !== 'undefined';

const getErrorMessage = (err) => {
  if (err instanceof NetworkError) return `🌐 ${err.message}. Перевірте підключення до інтернету.`;
  if (err instanceof HttpError) return `⚠️ ${err.message}`;
  if (err instanceof JsonParseError) return `🧩 ${err.message}`;
  return `❌ Невідома помилка: ${err.message}`;
};

// ---------- Виведення в HTML ----------
const renderList = (users) => {
  const list = document.getElementById('users');
  list.replaceChildren(
    ...users.map((user) => {
      const li = document.createElement('li');
      li.textContent = formatUser(user);
      return li;
    })
  );
  document.getElementById('count').textContent = `Знайдено користувачів: ${users.length}`;
};

const showError = (message) => {
  const box = document.getElementById('error');
  box.textContent = message;
  box.hidden = !message;
};

const fillCitySelect = (cities, selected) => {
  const select = document.getElementById('city');
  select.replaceChildren(
    ...['', ...cities].map((city) => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city || 'Усі міста';
      option.selected = city === selected;
      return option;
    })
  );
};

// ---------- Головна логіка ----------
const main = async () => {
  try {
    const users = await fetchUsers();
    console.log(`Завантажено користувачів: ${users.length}`);

    const prepare = (city) =>
      sortByName(city ? filterByCity(users, city) : users).map(toSimpleUser);

    // Вивід у консоль
    const initial = prepare(DEFAULT_CITY);
    console.log(`Користувачі з міста ${DEFAULT_CITY} (відсортовані за ім'ям):`);
    initial.forEach((user) => console.log(' •', formatUser(user)));
    console.table(prepare(''));

    // Вивід у HTML
    if (inBrowser) {
      showError('');
      fillCitySelect(getCities(users), DEFAULT_CITY);
      renderList(initial);
      document.getElementById('city').addEventListener('change', (e) => {
        renderList(prepare(e.target.value));
      });
    }
  } catch (err) {
    const message = getErrorMessage(err);
    console.error(message);
    if (inBrowser) showError(message);
  }
};

main();
