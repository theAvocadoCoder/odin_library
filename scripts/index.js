
/* Variables */

// the myLib array contains all the book info. 
let myLib = [
  null,
];

const libraryDisplay = document.getElementById("library-display"),
  openModal = document.getElementById("open-modal"),
  newBookModal = document.getElementById("new-book-modal"),
  newBookTitle = document.getElementById("new-book-title"),
  newBookAuthor = document.getElementById("new-book-author"),
  newBookPages = document.getElementById("new-book-pages"),
  addBookBtn = document.getElementById("add-book-btn"),
  editBookModal = document.getElementById("edit-book-modal"),
  editBookTitle = document.getElementById("edit-book-title"),
  editBookAuthor = document.getElementById("edit-book-author"),
  editBookPages = document.getElementById("edit-book-pages"),
  saveBookBtn = document.getElementById("save-book-btn");

let selectedBook = null;



/* Book Class */

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    let output = `${this.title} by ${this.author}, ${this.pages} pages. `;
    if (this.read === true) {
      output += 'READ.';
    } else {
      output += 'NOT READ.'
    }
    return output;
  }

  toggleRead() {
    this.read === true ? this.read = false : this.read = true;
  }
}



/* Event Listeners */

document.onload = displayAllBooks();
addBookBtn.addEventListener('click', createBook);
openModal.addEventListener('click', () => { newBookModal.style.display = 'flex' });
saveBookBtn.addEventListener('click', saveBook);



/* Helper Functions */

function createBook() {
  let index = -1;
  myLib.forEach(book => {
    if (
      book !== null
      && book.author.toLowerCase() === newBookAuthor.value.toLowerCase()
      && book.title.toLowerCase() === newBookTitle.value.toLowerCase()
    ) {
      index = myLib.indexOf(book);
    }
  });
  if (index !== -1) {
    delete myLib[index].hidden;
    const bookDiv = document.getElementById(`book-${myLib[index].id}`);
    if (newBookPages) myLib.pages = newBookPages;
    if (newBookAuthor) myLib.author = newBookAuthor.trim();
    if (newBookTitle) myLib.title = newBookTitle.trim();
    bookDiv.style.display = 'flex';
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookModal.style.display = 'none';

  } else {
    const bookObj = newBookTitle.value
      && newBookAuthor.value
      && createBookObj(myLib.length, newBookTitle.value.trim(), newBookAuthor.value.trim(), newBookPages.value);
    if (bookObj) addBookToLibrary(bookObj);
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookModal.style.display = 'none';
  }

}

function saveBook() {
  const bookObj = editBookTitle.value && editBookAuthor.value && createBookObj(selectedBook.id, editBookTitle.value.trim(), editBookAuthor.value.trim(), editBookPages.value);
  bookObj ? editBookInLibrary(bookObj) : editBookModal.style.display = 'none';
  editBookTitle.value = '';
  editBookAuthor.value = '';
  editBookPages.value = '';
  editBookModal.style.display = 'none';

}

function createBookObj(id, title, author, pages, read = false) {
  return new Book(id, title, author, pages, read);
}

function addBookToLibrary(bookObj) {
  myLib = [...myLib, bookObj];
  displayBook(bookObj);
}

function editBookInLibrary(bookObj) {
  myLib[selectedBook.id] = bookObj;
  updateBookDiv(bookObj);
  selectedBook = null;
}

function updateBookDiv(bookObj) {
  const bookTitle = document.getElementById(`book-${selectedBook.id}-title`);
  const bookAuthor = document.getElementById(`book-${selectedBook.id}-author`);
  const bookPages = document.getElementById(`book-${selectedBook.id}-pages`);

  bookTitle.removeChild(bookTitle.firstChild);
  bookTitle.appendChild(document.createTextNode(bookObj.title));

  bookAuthor.removeChild(bookAuthor.firstChild);
  bookAuthor.appendChild(document.createTextNode(bookObj.author));

  bookPages.removeChild(bookPages.firstChild);
  bookPages.appendChild(document.createTextNode(`${bookObj.pages} pages`));

  selectedBook = null;
}

function displayAllBooks() {
  const firstBook = createBookObj(1, 'Mother of Learning', 'Demagoj Kurmaic', 1871, true);
  myLib = [...myLib, firstBook];
  myLib.forEach(book => {
    if (book && !book.hidden) displayBook(book);
  })
}

function displayBook(bookObj) {
  const bookDiv = createBookDiv(bookObj);
  libraryDisplay.appendChild(bookDiv);
}

function createBookDiv(bookObj) {
  const bookDiv = document.createElement('div'),
    title = document.createElement('h2'),
    author = document.createElement('h4'),
    bottomInfo = document.createElement('div'),
    pages = document.createElement('p'),
    status = document.createElement('div'),
    read = document.createElement('span'),
    sliderSwitch = document.createElement('label'),
    sliderInput = document.createElement('input'),
    sliderSpan = document.createElement('span'),
    options = document.createElement('div'),
    edit = document.createElement('div'),
    editBtn = document.createElement('button'),
    remove = document.createElement('div'),
    removeBtn = document.createElement('button');

  editBtn.addEventListener('click', () => {
    selectedBook = myLib[bookObj.id];
    openEditBookModal();
  });
  editBtn.appendChild(document.createTextNode('Edit'));

  edit.id = `book-${bookObj.id}-edit`;
  edit.classList.add('flex', 'centered');
  edit.appendChild(editBtn);

  removeBtn.addEventListener('click', () => {
    selectedBook = myLib[bookObj.id];
    removeBook(selectedBook);
  });
  removeBtn.appendChild(document.createTextNode('Remove'));

  remove.id = `book-${bookObj.id}-remove`;
  remove.classList.add('flex', 'centered');
  remove.appendChild(removeBtn);

  options.id = `book-${bookObj.id}-options`;
  options.classList.add('flex', 'centered');
  options.appendChild(edit);
  options.appendChild(remove);

  sliderSpan.classList.add('slider', 'round');
  sliderInput.type = 'checkbox';
  sliderInput.checked = bookObj.read;
  sliderSwitch.classList.add('switch');
  sliderInput.addEventListener('click', () => { myLib[bookObj.id].toggleRead() });
  sliderSwitch.appendChild(sliderInput);
  sliderSwitch.appendChild(sliderSpan);

  read.appendChild(document.createTextNode('Read:'));

  status.id = `book-${bookObj.id}-status`;
  status.classList.add('flex', 'centered');
  status.appendChild(read);
  status.appendChild(sliderSwitch);

  pages.id = `book-${bookObj.id}-pages`;
  pages.appendChild(document.createTextNode(`${bookObj.pages} pages`));

  bottomInfo.classList.add('bottom-info');
  bottomInfo.appendChild(pages);
  bottomInfo.appendChild(status);
  bottomInfo.appendChild(options);

  author.id = `book-${bookObj.id}-author`;
  author.appendChild(document.createTextNode(bookObj.author));

  title.id = `book-${bookObj.id}-title`;
  title.appendChild(document.createTextNode(bookObj.title));

  bookDiv.id = `book-${bookObj.id}`;
  bookDiv.classList.add('flex', 'col', 'centered');
  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(bottomInfo);

  return bookDiv;
}

function openEditBookModal() {

  editBookTitle.value = selectedBook.title;
  editBookAuthor.value = selectedBook.author;
  editBookPages.value = selectedBook.pages;
  editBookModal.style.display = 'flex';
}

function removeBook(book) {
  const bookDiv = document.getElementById(`book-${book.id}`);
  bookDiv.style.display = 'none'
  myLib[book.id].read = false;
  myLib[book.id].hidden = true;
  selectedBook = null;
}
