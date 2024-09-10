const myLibrary = [];
const pageContent = document.querySelector(".container");
const showDialogue = document.querySelector("#showDialogue")
const formDialogue = document.querySelector("dialog");
const nameInput = document.querySelector("#name");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#pages");
const typeInput = document.querySelector("#bookType");
const confirmButton = document.querySelector("#confirmButton");

showDialogue.addEventListener("click", () => {
    formDialogue.showModal();
})

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function Manga(name, author, volumes, isFinished, isRead) {
    this.name = name;
    this.author = author;
    this.volumes = volumes;
    this.isFinished = isFinished;
    this.isRead = isRead;
}

const onePiece = new Manga("One Piece", "Eiichiro Oda", 109, false, false);
const caseClosed = new Manga("Case Closed", "Gosho Aoyama", 105, false, false);
const dragonBall = new Manga("Dragon Ball", "Akira Toriyama", 42, true, true);



function addBookToLibrary(book) {

    myLibrary.push(book);

}

addBookToLibrary(onePiece);
addBookToLibrary(caseClosed);
addBookToLibrary(dragonBall);

refreshLibrary();

function refreshLibrary() {
    myLibrary.forEach((book) => {
        console.log(book);
        if (book instanceof Book){
            pageContent.insertAdjacentHTML("afterbegin", `<div class='book'>
                <h2>${book.name}</h2>
                <p>${book.author}</p>
                <p>${book.pages}</p>
                <p>Read: ${book.isRead}</p>
            </div>`);
        }
        else {
            pageContent.insertAdjacentHTML("afterbegin", `<div class="manga">
                <h2>${book.name}</h2>
                <p>${book.author}</p>
                <p>${book.volumes}</p>
                <p>Series finished: ${book.isFinished}</p>
                <p>Read: ${book.isRead}</p>
            </div>`)
        }
        
    })
}

confirmButton.addEventListener("click", () => {

    console.log("form submitted!");

    addBooks(typeInput.value, nameInput.value, authorInput.value, pageInput.value);
    formDialogue.close();

})

function addBooks(bookType, name, author, pagesOrVolumes, isRead, isFinished) {
    let mangaCollection = document.querySelector(".manga");
    let bookCollection = document.querySelector(".book");
    pageContent.innerHTML = '';
    if (bookType === "Book") {
        let newBook = new Book(name, author, pagesOrVolumes, isRead);
        addBookToLibrary(newBook);
    }
    else {
        let newManga = new Manga(name, author, pagesOrVolumes, isFinished, isRead);
        addBookToLibrary(newManga);
    }

    refreshLibrary();
}