    const express = require("express");

    const router = express.Router();

    // Fake database
    let books = [
    { id: 1, title: "hajar book" },
    { id: 2, title: "hiba book" },
    ];

    // GET ALL BOOKS
    router.get("/", (req, res) => {

    // Vérifier si l'utilisateur est connecté
    if (!req.session.isAuth) {
        return res.status(401).json({
        message: "Access denied. Please login first",
        });
    }

    // Retourner la liste des livres
    res.json(books);
    });

    // ADD NEW BOOK
    router.post("/", (req, res) => {

    // Vérifier si l'utilisateur est connecté
    if (!req.session.isAuth) {
        return res.status(401).json({
        message: "Access denied. Please login first",
        });
    }

    // Créer un nouveau livre
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
    };

    // Ajouter dans le tableau
    books.push(newBook);

    // Réponse
    res.status(201).json({
        message: "Book added successfully",
        book: newBook,
    });
    });

    module.exports = router;