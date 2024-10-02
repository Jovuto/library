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
                <p class="indexNum">${i}</p>
                <button class="deleteButton>Delete</button>
            </div>`);
            console.log("book printed");
        }
        else {
            console.log("Manga added!")
            pageContent.insertAdjacentHTML("beforeend", `<div class="manga">
                <h2>${book.name}</h2>
                <p>Author: ${book.author}</p>
                <p>Volumes: ${book.volumes}</p>
                <p>Series finished: ${book.isFinished}</p>
                <p>Read: ${book.isRead}</p>
                <p class="indexNum">${i}</p>
                <button class="deleteButton">Delete</button>
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