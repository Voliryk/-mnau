// ==========================================
// 1. Початковий масив бібліотеки (об'єкти)
// ==========================================
let library = [
  { title: "1984", author: "Джордж Орвелл", year: 1949, genre: "Дистопія", available: true },
  { title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Ролінґ", year: 1997, genre: "Фентезі", available: false },
  { title: "Володар перснів", author: "Дж. Р. Р. Толкін", year: 1954, genre: "Фентезі", available: true },
  { title: "Код да Вінчі", author: "Ден Браун", year: 2003, genre: "Детектив", available: true },
  { title: "Маленький принц", author: "Антуан де Сент-Екзюпері", year: 1943, genre: "Філософія", available: false }
];

function addBook(lib, newBook) {
  lib.push(newBook);
  console.log(`Книга "${newBook.title}" додана до бібліотеки.`);
}

function removeBook(lib, title) {
  const index = lib.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
  if (index !== -1) {
    lib.splice(index, 1);
    console.log(`Книга "${title}" видалена.`);
  } else {
    console.log(`Помилка: Книга "${title}" не знайдена.`);
  }
}

const findBooksByAuthor = (lib, author) => {
  const result = lib.filter(book => book.author.toLowerCase() === author.toLowerCase());
  console.log(`\nКниги автора "${author}":`);
  if (result.length > 0) {
    result.forEach(book => {
      const status = book.available ? "Доступна" : "Видана";
      console.log(`- ${book.title} (${book.year}, ${book.genre}, ${status})`);
    });
  } else {
    console.log(`Книг автора "${author}" не знайдено.`);
  }
};

const getTotalBooks = (lib) => lib.length;

function toggleAvailability(lib, title) {
  const book = lib.find(b => b.title.toLowerCase() === title.toLowerCase());
  if (book) {
    book.available = !book.available;
    const newStatus = book.available ? "Доступна" : "Видана";
    console.log(`Статус книги "${book.title}" змінено на: ${newStatus}.`);
  } else {
    console.log(`Помилка: Книга "${title}" не знайдена.`);
  }
}

console.log("=== ДЕМОНСТРАЦІЯ РОБОТИ МЕНЕДЖЕРА БІБЛІОТЕКИ ===\n");
console.log(`Загальна кількість книг на початку: ${getTotalBooks(library)}`);

const newBook = { title: "Шерлок Холмс", author: "Артур Конан Дойл", year: 1887, genre: "Детектив", available: true };
addBook(library, newBook);
console.log(`Загальна кількість книг після додавання: ${getTotalBooks(library)}`);

findBooksByAuthor(library, "Дж. К. Ролінґ");

console.log("\n--- Зміна статусу книги ---");
toggleAvailability(library, "1984");

console.log("\n--- Видалення книг ---");
removeBook(library, "1984");
removeBook(library, "Неіснуюча Книга");

console.log(`\nЗагальна кількість книг у кінці: ${getTotalBooks(library)}`);
