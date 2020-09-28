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

  for(i = myLibrary.length - 1; i < myLibrary.length; i++){
    const book = document.createElement('div');
    book.classList.add('displayedBook')
    bookDisplay.appendChild(book);
      for(j = 0; j < 4; j++){
        const detail = document.createElement('div');
        detail.classList.add('displayedDetails');
        detail.setAttribute("id", "detail_" + i + j);
        book.appendChild(detail);
      }
    document.getElementById("detail_" + i + "0").textContent = "Title: " + myLibrary[i].title; 
    document.getElementById("detail_" + i + "1").textContent = "Author: " + myLibrary[i].author;
    document.getElementById("detail_" + i + "2").textContent = "No. of Pages: " + myLibrary[i].pages;
    if(myLibrary[i].read === false){
      document.getElementById("detail_" + i + "3").textContent = "Unread";   
    } else {
      document.getElementById("detail_" + i + "3").textContent = "Read";
    }
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.setAttribute("id", "delete" + i)
    deleteButton.textContent = "Delete Book"
    book.appendChild(deleteButton);
  }
}


addBook.addEventListener("click", function(){
  inputTable.reset();
  inputTable.classList.toggle("inputTableActive");
});

let deleteButtons = document.getElementsByClassName("deleteButton");
let deleteButtonsArray = Array.from(deleteButtons);

// deleteButton.forEach(function(e){
//   e.addEventListener("click", function(){

//   })
// })


// adds a book to the library

function addBookToLibrary(ev){
  ev.preventDefault();
  let newBook = new Book(document.getElementById("title").value,
                         document.getElementById("author").value, 
                         parseInt(document.getElementById("pages").value), 
                         document.getElementById("read").checked);
  myLibrary.push(newBook);
  console.log(myLibrary);
  inputTable.classList.toggle("inputTableActive")
  displayAllBooks();
}

submitButton.addEventListener("click", addBookToLibrary);