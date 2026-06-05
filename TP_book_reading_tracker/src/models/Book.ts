import mongoose, {
    Schema,
    Document
} from "mongoose";

import BookStatus from "../enums/BookStatus";

import BookFormat from "../enums/BookFormat";

export interface BookDocument extends Document {

    title: string;

    author: string;

    numberOfPages: number;

    status: BookStatus;

    price: number;

    pagesRead: number;

    format: BookFormat;

    suggestedBy: string;

    finished: boolean;

    currentlyAt(): string;

    updatePagesRead(
        pages: number
    ): void;

    markAsFinished(): void;

    resetReading(): void;

    readingPercentage(): number;

    isLongBook(): boolean;

    getBookInfo(): string;
}

const bookSchema =
new Schema<BookDocument>(

    {

        title: {
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true
        },

        numberOfPages: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: Object.values(BookStatus),
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        pagesRead: {
            type: Number,
            default: 0
        },

        format: {
            type: String,
            enum: Object.values(BookFormat),
            required: true
        },

        suggestedBy: {
            type: String,
            required: true
        },

        finished: {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: true
    }
);

bookSchema.methods.currentlyAt =
function (): string {

    return `Page ${this.pagesRead}
    / ${this.numberOfPages}`;
};

bookSchema.methods.updatePagesRead =
function (
    pages: number
): void {

    this.pagesRead = pages;

    if (
        this.pagesRead >=
        this.numberOfPages
    ) {

        this.finished = true;
    }
};

bookSchema.methods.markAsFinished =
function (): void {

    this.finished = true;

    this.pagesRead =
    this.numberOfPages;
};

bookSchema.methods.resetReading =
function (): void {

    this.pagesRead = 0;

    this.finished = false;
};

bookSchema.methods.readingPercentage =
function (): number {

    return Math.round(

        (this.pagesRead
        / this.numberOfPages) * 100
    );
};

bookSchema.methods.isLongBook =
function (): boolean {

    return this.numberOfPages > 500;
};

bookSchema.methods.getBookInfo =
function (): string {

    return `
        Title: ${this.title}
        Author: ${this.author}
        Status: ${this.status}
    `;
};

const Book =
mongoose.model<BookDocument>(
    "Book",
    bookSchema
);

export default Book;