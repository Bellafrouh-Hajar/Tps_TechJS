import Book from "../models/Book";

import { IBook }
from "../interfaces/IBook";

export const createBook =
async (
    data: IBook
) => {

    return await Book.create(data);
};

export const getAllBooks =
async () => {

    return await Book.find();
};

export const getBookById =
async (
    id: string
) => {

    return await Book.findById(id);
};

export const updateBook =
async (
    id: string,
    data: Partial<IBook>
) => {

    return await Book.findByIdAndUpdate(

        id,

        data,

        {
            new: true
        }
    );
};

export const deleteBook =
async (
    id: string
) => {

    return await Book.findByIdAndDelete(id);
};