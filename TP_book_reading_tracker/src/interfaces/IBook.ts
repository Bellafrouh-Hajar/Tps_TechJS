import BookStatus from "../enums/BookStatus";

import BookFormat from "../enums/BookFormat";

export interface IBook {

    title: string;

    author: string;

    numberOfPages: number;

    status: BookStatus;

    price: number;

    pagesRead: number;

    format: BookFormat;

    suggestedBy: string;

    finished: boolean;
}