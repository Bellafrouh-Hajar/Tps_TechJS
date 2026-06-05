const API_URL = "/api/books";

const form =
document.getElementById("bookForm");

const booksContainer =
document.getElementById("booksContainer");

const totalBooks =
document.getElementById("totalBooks");

const finishedBooks =
document.getElementById("finishedBooks");

const totalPages =
document.getElementById("totalPages");

async function fetchBooks() {

    try {

        const response =
        await fetch(API_URL);

        const books =
        await response.json();

        renderBooks(books);

        updateStats(books);

    } catch (error) {

        console.error(error);
    }
}

function updateStats(books) {

    totalBooks.textContent =
    books.length;

    const finished =
    books.filter(
        book => book.finished
    ).length;

    finishedBooks.textContent =
    finished;

    const pages =
    books.reduce(

        (sum, book) =>
        sum + book.pagesRead,

        0
    );

    totalPages.textContent =
    pages;
}

function renderBooks(books) {

    booksContainer.innerHTML = "";

    books.forEach(book => {

        const percentage =
        Math.round(

            (book.pagesRead /
            book.numberOfPages) * 100
        );

        const card =
        document.createElement("div");

        card.className =
        "book-card";

        card.innerHTML = `

            <h3 class="text-2xl font-bold text-gray-800 mb-2">
                ${book.title}
            </h3>

            <p class="text-gray-600 mb-1">
                Author: ${book.author}
            </p>

            <p class="text-gray-600 mb-1">
                Status: ${book.status}
            </p>

            <p class="text-gray-600 mb-1">
                Format: ${book.format}
            </p>

            <p class="text-gray-600 mb-1">
                Suggested By: ${book.suggestedBy}
            </p>

            <p class="text-gray-600 mb-4">
                ${book.pagesRead}
                /
                ${book.numberOfPages}
                pages
            </p>

            <div class="progress-bar mb-2">
                <div
                    class="progress-fill"
                    style="width: ${percentage}%"
                ></div>
            </div>

            <p class="text-sm text-gray-500">
                ${percentage}% completed
            </p>

            <button
                class="delete-btn"
                onclick="deleteBook('${book._id}')"
            >
                Delete Book
            </button>
        `;

        booksContainer.appendChild(card);
    });
}

form.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const numberOfPages =
        Number(
            document.getElementById(
                "numberOfPages"
            ).value
        );

        const pagesRead =
        Number(
            document.getElementById(
                "pagesRead"
            ).value
        );

        const finished =
        pagesRead >= numberOfPages;

        const bookData = {

            title:
            document.getElementById(
                "title"
            ).value,

            author:
            document.getElementById(
                "author"
            ).value,

            numberOfPages,

            status:
            document.getElementById(
                "status"
            ).value,

            price:
            Number(
                document.getElementById(
                    "price"
                ).value
            ),

            pagesRead,

            format:
            document.getElementById(
                "format"
            ).value,

            suggestedBy:
            document.getElementById(
                "suggestedBy"
            ).value,

            finished
        };

        try {

            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(bookData)
            });

            form.reset();

            fetchBooks();

        } catch (error) {

            console.error(error);
        }
    }
);

async function deleteBook(id) {

    try {

        await fetch(

            `${API_URL}/${id}`,

            {
                method: "DELETE"
            }
        );

        fetchBooks();

    } catch (error) {

        console.error(error);
    }
}

fetchBooks();