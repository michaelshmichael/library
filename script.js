let myLibrary = [
{title: "A Gentleman In Moscow", author: "Amor Towles", pages: 462, read: true},
{title: "Total Recall", author: "Arnold Schwarzenegger", pages: 390, read: false} ,
{title: "Any Human Heart", author: "William Boyd", pages: 510, read: true}
];

const bookDisplay = document.getElementById("bookDisplay");
const addBook = document.getElementById("addBook");
const inputTable = document.querySelector(".inputTable");


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

displayAllBooks();

function Book() {
  // the constructor...
}

addBook.addEventListener("click", function(){
  inputTable.classList.toggle("inputTableActive");
});

function addBookToLibrary() {

}