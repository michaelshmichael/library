let myLibrary
if (localStorage.getItem('items')) {
  myLibrary = JSON.parse(localStorage.getItem('items'))
} else {
  myLibrary = []
}
localStorage.setItem('items', JSON.stringify(myLibrary));

let data = JSON.parse(localStorage.getItem('items'));
const bookDisplay = document.getElementById("bookDisplay");
const addBook = document.getElementById("addBook");
const inputTable = document.querySelector(".inputTable");
const submitButton = document.getElementById("submitButton");
const clearButton = document.getElementById("clearBooks")
const launchHeader = document.getElementById("header");

// book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function renderBooks (data){
  bookDisplay.innerHTML = '';
    for(i = 0; i < data.length; i++){
      const book = document.createElement('div');
    //book.classList.add('readBook')
      launchHeader.classList.add('hiddenHeader')
      book.setAttribute("data-index", i);
      bookDisplay.appendChild(book);

              // creating the individual elements on the cards
              for(j = 0; j < 4; j++){
                const detail = document.createElement('div');
                detail.classList.add('displayedDetails');
                detail.setAttribute("id", "detail_" + i + j);
                book.appendChild(detail);
              }

      //creating the text values and whether read or not for the books
      document.getElementById("detail_" + i + "0").textContent = "Title: " + data[i].title; 
      document.getElementById("detail_" + i + "1").textContent = "Author: " + data[i].author;
      document.getElementById("detail_" + i + "2").textContent = "No. of Pages: " + data[i].pages;
        if(data[i].read === false){
          document.getElementById("detail_" + i + "3").textContent = "Unread";
          book.classList.add('unreadBook')  
        } else {
          document.getElementById("detail_" + i + "3").textContent = "Read";
          book.classList.add('readBook');
        }

      //creating the delete button and setting its values
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.setAttribute("id", "delete" + i)
      deleteButton.setAttribute("data-index", i);
      deleteButton.textContent = "Delete Book"
      book.appendChild(deleteButton);
      deleteButton.addEventListener("click", function(e){
        removeBook(e)
      })

      const toggleReadButton = document.createElement("button");
      toggleReadButton.classList.add("toggleRead");
      toggleReadButton.setAttribute("data-index", i);
      toggleReadButton.textContent = "Read?";
      book.appendChild(toggleReadButton);
      toggleReadButton.addEventListener("click", function(e){
        toggleRead(e);
    })
  };
}

submitButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary(e){
  e.preventDefault();
  let newBook = new Book(document.getElementById("title").value,
                         document.getElementById("author").value, 
                         parseInt(document.getElementById("pages").value), 
                         document.getElementById("read").checked);
  myLibrary.push(newBook);
  localStorage.setItem('items', JSON.stringify(myLibrary));
  data = JSON.parse(localStorage.getItem('items'));
  inputTable.classList.toggle("inputTableActive")
  renderBooks(data)
};


// removing book from library
function removeBook(e) {
  const index = e.target.dataset.index;
  console.log(index);
  myLibrary.splice(index, 1);
  bookDisplay.removeChild(bookDisplay.childNodes[index]);
  localStorage.setItem('items', JSON.stringify(myLibrary));
  console.log(myLibrary)
  for (let i = 0; i < bookDisplay.childElementCount; i++) {
    bookDisplay.childNodes[i].childNodes[4].setAttribute("data-index", i);
    bookDisplay.childNodes[i].childNodes[3].setAttribute("data-index", i); 
  }
}

// this toggles whether the book has been read or not
function toggleRead(e) {
  const index = e.target.dataset.index;
  let currentBooks = document.querySelectorAll("div.unreadBook, div.readBook");
  let currentBooksArray = Array.from(currentBooks);
  // if the book is read
  if(data[index].read === true){
    data[index].read = false;
    myLibrary[index].read = false;
    document.getElementById("detail_" + index + "3").textContent = "Unread";
    currentBooksArray.forEach(function(book){
      if (book.dataset.index === index){
        book.classList.remove('readBook')
        book.classList.add('unreadBook')
      };
    })
  // if the book is unread
  } else {
    data[index].read = true;
    myLibrary[index].read = true;
    document.getElementById("detail_" + index + "3").textContent = "Read";
    currentBooksArray.forEach(function(book){
      if (book.dataset.index === index){
        book.classList.remove('unreadBook')
        book.classList.add('readBook')
      };
    })
  }
  for (let i = 0; i < bookDisplay.childElementCount; i++) {
    bookDisplay.childNodes[i].childNodes[4].setAttribute("data-index", i);
    bookDisplay.childNodes[i].childNodes[3].setAttribute("data-index", i); 
  }
  localStorage.setItem('items', JSON.stringify(myLibrary));
};

// making the input table visible
addBook.addEventListener("click", function(){
  inputTable.reset();
  inputTable.classList.toggle("inputTableActive");
});

if(data.length != 0){
  clearButton.addEventListener("click", function(){
    if((confirm('Are you really sure you want to delete the library?') == true)){
      bookDisplay.innerHTML = '';
      myLibrary = [];
      data = [];
      localStorage.clear(); 
    }
    launchHeader.classList.add('hiddenHeader')
  })
};

renderBooks(data)