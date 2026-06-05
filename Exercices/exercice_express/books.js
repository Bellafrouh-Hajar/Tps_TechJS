const express = require("express");

const router = express.Router();

// Fake database
let books = [
  { id: 1, title: "HIBA BOOK" },
  { id: 2, title: "HAJAR BOOK" },
];

// GET books
router.get("/", (req, res) => {

  // Vérifier session
  if (!req.session.isAuth) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  res.json(books);
});

module.exports = router;