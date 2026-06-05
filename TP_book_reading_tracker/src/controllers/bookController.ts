import {
    Request,
    Response
} from "express";

import * as bookService
from "../services/bookService";

export const createBook =
async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const book =
        await bookService.createBook(
            req.body
        );

        res.status(201).json(book);

    } catch (error) {

        res.status(500).json(error);
    }
};

export const getBooks =
async (
    _req: Request,
    res: Response
): Promise<void> => {

    try {

        const books =
        await bookService.getAllBooks();

        res.json(books);

    } catch (error) {

        res.status(500).json(error);
    }
};

export const getBook =
async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const book =
        await bookService.getBookById(
            String(req.params.id)
        );

        res.json(book);

    } catch (error) {

        res.status(500).json(error);
    }
};

export const updateBook =
async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const book =
        await bookService.updateBook(

            String(req.params.id),

            req.body
        );

        res.json(book);

    } catch (error) {

        res.status(500).json(error);
    }
};

export const deleteBook =
async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        await bookService.deleteBook(
            String(req.params.id)        );

        res.json({

            message:
            "Book deleted"
        });

    } catch (error) {

        res.status(500).json(error);
    }
};