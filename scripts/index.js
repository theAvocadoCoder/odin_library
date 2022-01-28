
let myLib = [
  {
    title: 'Mother of Learning',
    author: 'Demagoj Kurmaic',
    pages: 1871,
    read: true,
  },
  {
    title: 'Reaper',
    author: 'Will Wight',
    pages: 338,
    read: true,
  }
];

/* Book Class */

class Book {
  constructor(title, author, pages, read) {
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

function createBook() {

}

function addBookToLibrary() { }
