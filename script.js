const myLibrary = [];
const pageContent = document.querySelector(".container");
const showDialogue = document.querySelector("#showDialogue")
const formDialogue = document.querySelector("dialog");
const nameInput = document.querySelector("#name");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#pages");
const typeInput = document.querySelector("#bookType");
const confirmButton = document.querySelector("#confirmButton");
const bookOptions = document.querySelector("#bookType");
const isFinishedDiv = document.querySelector(".isFinishedDiv");
const isReadCheckbox = document.querySelector("#isRead");
const isFinishedCheckbox = document.querySelector("#isFinished");
const deleteButton = document.querySelectorAll(".deleteButton");
const readButton = document.querySelectorAll(".readButton");

showDialogue.addEventListener("click", () => {
    formDialogue.showModal();
})

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
    refreshLibrary();
}

function Manga(name, author, volumes, isFinished, isRead) {
    this.name = name;
    this.author = author;
    this.volumes = volumes;
    this.isFinished = isFinished;
    this.isRead = isRead;
}

Object.setPrototypeOf(Manga.prototype, Book.prototype);

const onePiece = new Manga("One Piece", "Eiichiro Oda", 109, false, false);
const caseClosed = new Manga("Case Closed", "Gosho Aoyama", 105, false, false);
const dragonBall = new Manga("Dragon Ball", "Akira Toriyama", 42, true, true);
const naruto = new Manga("Naruto", "Masashi Kishimoto", 72, true, true);
const aTaleOfTwoCities = new Book ("A Tale of Two Cities", "Charles Dickens", 544, false);
const theLittlePrince = new Book ("The Little Prince", "Antoine de Saint-Exupéry", 109, false);
const slamDunk = new Manga ("Slam Dunk", "Takehiko Inoue", 31, true, false);
const theAlchemist = new Book ("The Alchemist", "Paulo Coelho", 208, false);
const andThenThereWereNone = new Book ("And Then There Were None", "Agatha Christie", 240, false);
const dreamOfTheRedChamber = new Book ("Dream of the Red Chamber", "Cao Xueqin", 352, false);

console.log(Object.getPrototypeOf(Manga));

function addBookToLibrary(book) {

    myLibrary.push(book);

}

addBookToLibrary(onePiece);
addBookToLibrary(caseClosed);
addBookToLibrary(dragonBall);
addBookToLibrary(naruto);
addBookToLibrary(aTaleOfTwoCities);
addBookToLibrary(theLittlePrince);
addBookToLibrary(slamDunk);
addBookToLibrary(theAlchemist);
addBookToLibrary(andThenThereWereNone);
addBookToLibrary(dreamOfTheRedChamber);

refreshLibrary();

pageContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteButton")){
        console.log(e.target.dataset.arrayIndex);
        removeBook(e.target.dataset.arrayIndex);
    }
    else if (e.target.classList.contains("readButton")) {
        console.log(e.target.dataset.arrayIndex);
        myLibrary[e.target.dataset.arrayIndex].toggleRead();
    }
})

function refreshLibrary() {
    pageContent.innerHTML = '';
    let i = -1;
    myLibrary.forEach((book) => {
        i++;
        console.log(book);
        if (book instanceof Book){
            console.log("Book added!");
            pageContent.insertAdjacentHTML("beforeend", `<div class='book'>
                <h2>${book.name}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.isRead}</p>
                <button class="deleteButton" data-array-index=${i}>Delete</button>
                <button class="readButton" data-array-index=${i}>Toggle Read</button>
            </div>`);
        }
        else {
            console.log("Manga added!")
            pageContent.insertAdjacentHTML("beforeend", `<div class="manga">
                <h2>${book.name}</h2>
                <p>Author: ${book.author}</p>
                <p>Volumes: ${book.volumes}</p>
                <p>Series finished: ${book.isFinished}</p>
                <p>Read: ${book.isRead}</p>
                <button class="deleteButton" data-array-index=${i}>Delete</button>
                <button class="readButton" data-array-index=${i}>Toggle Read</button>
            </div>`)
            console.log("manga printed");
        }
        })
        
    }

function removeBook(index) {
    myLibrary.splice(index, 1);
    refreshLibrary();
}

bookOptions.addEventListener("change", function() {
    if (bookOptions.value == "manga") {
        isFinishedDiv.style.display = "block";
    }
    else {
        console.log("It is working");
        isFinishedDiv.style.display = "none";
    }
})

confirmButton.addEventListener("click", () => {

    console.log("form submitted!");

    addBooks(typeInput.value, nameInput.value, authorInput.value, pageInput.value, isReadCheckbox.checked, isFinishedCheckbox.checked);
    formDialogue.close();

})

function addBooks(bookType, name, author, pagesOrVolumes, isRead, isFinished) {
    if (bookType == "book") {
        let newBook = new Book(name, author, pagesOrVolumes, isRead);
        addBookToLibrary(newBook);
    }
    else {
        let newManga = new Manga(name, author, pagesOrVolumes, isFinished, isRead);
        addBookToLibrary(newManga);
    }

    refreshLibrary();
}