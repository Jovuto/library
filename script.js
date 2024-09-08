const myLibrary = [];
const pageContent = document.querySelector(".container");

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function Manga(name, author, volumes, isFinished) {
    this.name = name;
    this.author = author;
    this.volumes = volumes;
    this.isFinished = isFinished;
}

const onePiece = new Manga("One Piece", "Eiichiro Oda", 109, false);
const caseClosed = new Manga("Case Closed", "Gosho Aoyama", 105, false);
const dragonBall = new Manga("Dragon Ball", "Akira Toriyama", 42, true);

function addBookToLibrary(book) {

    myLibrary.push(book);

}

addBookToLibrary(onePiece);
addBookToLibrary(caseClosed);
addBookToLibrary(dragonBall);

myLibrary.forEach((book) => {
    console.log(book);
    if (book instanceof Book){
        pageContent.insertAdjacentHTML("afterbegin", `<div class='book'>
            <h2>${book.name}</h2>
            <p>${book.author}</p>
            <p>${book.pages}</p>
        </div>`);
    }
    else {
        pageContent.insertAdjacentHTML("afterbegin", `<div class="manga">
            <h2>${book.name}</h2>
            <p>${book.author}</p>
            <p>${book.volumes}</p>
        </div>`)
    }
    
})