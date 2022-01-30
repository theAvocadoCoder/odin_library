
/* Variables */

let myLib = [
  {},
  {
    id: 1,
    title: 'Mother of Learning',
    author: 'Demagoj Kurmaic',
    pages: 1871,
    read: true,
  }
];

const libraryDisplay = document.getElementById("library-display"),
  openModal = document.getElementById("open-modal"),
  newBookModal = document.getElementById("new-book-modal"),
  addBookBtn = document.getElementById("add-book-btn"),
  newBookTitle = document.getElementById("new-book-title"),
  newBookAuthor = document.getElementById("new-book-author"),
  newBookPages = document.getElementById("new-book-pages");



/* Event Listeners */

addBookBtn.addEventListener('click', createBook);
openModal.addEventListener('click', () => { newBookModal.style.display = 'flex' });



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
    if (this.read() === true) {
      output += 'READ.';
    } else {
      output += 'NOT READ.'
    }
    return output;
  }

  toggleRead() {
    this.read === true ? this.read = false : true;
  }
}



/* Helper Functions */

function createBook() {
  const bookObj = newBookTitle.value && newBookAuthor.value && createBookObj(newBookTitle.value, newBookAuthor.value, newBookPages.value);
  bookObj ? addBookToLibrary(bookObj) : newBookModal.style.display = 'none';
  newBookTitle.value = '';
  newBookAuthor.value = '';
  newBookPages.value = '';
  newBookModal.style.display = 'none';

}

function createBookObj(title, author, pages = null, read = false) {
  return new Book(myLib.length, title, author, pages, read);
}

function addBookToLibrary(bookObj) {
  myLib = [...myLib, bookObj];
  displayNewBook(bookObj);
}

function displayAllBooks() {
  myLib.forEach(book => {
    const bookDiv = createBookDiv(book);
    libraryDisplay.appendChild(bookDiv);
  })
}

function displayNewBook(bookObj) {
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
    sliderSpan = document.createElement('span');

  sliderSpan.classList.add('slider', 'round');
  sliderInput.type = 'checkbox';
  sliderInput.checked = bookObj.read;
  sliderSwitch.classList.add('switch');
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
