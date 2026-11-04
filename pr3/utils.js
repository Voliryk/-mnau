// utils.js — модуль для маніпуляції даними JSON

// Фільтрація за містом (регістр не враховується)
export const filterByCity = (users, city) =>
  users.filter(({ address }) => address?.city?.toLowerCase() === city.trim().toLowerCase());

// Сортування за ім'ям (за зростанням); оригінальний масив не змінюється
export const sortByName = (users) =>
  [...users].sort((a, b) => a.name.localeCompare(b.name));

// Унікальні міста (для випадаючого списку), відсортовані за алфавітом
export const getCities = (users) =>
  [...new Set(users.map(({ address }) => address?.city).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

// Перетворення складного об'єкта користувача на простий
export const toSimpleUser = ({ id, name, email, address, company }) => ({
  id,
  name,
  email,
  city: address?.city ?? '—',
  company: company?.name ?? '—'
});

// Текстовий рядок для виводу
export const formatUser = ({ name, email, city }) => `${name} (${email}) — ${city}`;
