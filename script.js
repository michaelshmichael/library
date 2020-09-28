let myLibrary = [];
const bookDisplay = document.getElementById("bookDisplay");
const addBook = document.getElementById("addBook");
const inputTable = document.querySelector(".inputTable");
const submitButton = document.getElementById("submitButton");

// book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// showing books
function displayAllBooks(){
  for(i = 0; i < myLibrary.length; i++){
  const book = document.createElement('div');
  book.classList.add('displayedBook')
  bookDisplay.appendChild(book);
  const title = myLibrary[i].title;
  const author = myLibrary[i].author;
  const pages = myLibrary[i].pages;
  const read = myLibrary[i].read;
  book.textContent = title + author + pages + read
  }
}

addBook.addEventListener("click", function(){
  inputTable.reset();
  inputTable.classList.toggle("inputTableActive");
});

// adds a book to the library
function addBookToLibrary(ev){
  ev.preventDefault();
  let newBook = new Book(document.getElementById("title").value,
                         document.getElementById("author").value, 
                         document.getElementById("pages").value, 
                         document.getElementById("read").value);
  myLibrary.push(newBook);
  console.log(myLibrary);
  inputTable.classList.toggle("inputTableActive")
  displayAllBooks();
}

submitButton.addEventListener("click", addBookToLibrary);