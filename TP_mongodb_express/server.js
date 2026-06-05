  const express = require("express");
  const session = require("express-session");
  const mongoose = require("mongoose");
  const bcrypt = require("bcrypt");

  const User = require("./User");
  const booksRouter = require("./books");

  const app = express();

  // Middleware JSON
  app.use(express.json());

  // Session
  app.use(
    session({
      secret: "secretKey",
      resave: false,
      saveUninitialized: true,
    })
  );

  /* =========================
    MONGODB CONNECTION
  ========================= */

  mongoose
    .connect("mongodb://127.0.0.1:27017/booksDB")
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });

  /* =========================
    REGISTER
  ========================= */

  app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    // Vérifier si utilisateur existe
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  });

  /* =========================
    LOGIN
  ========================= */

  app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    // Chercher utilisateur
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Vérifier password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // Session login
    req.session.isAuth = true;

    res.json({
      message: "Login successful",
    });
  });

  /* =========================
    LOGOUT
  ========================= */

  app.get("/logout", (req, res) => {

    req.session.destroy();

    res.json({
      message: "Logged out",
    });
  });

  /* =========================
    BOOKS ROUTES
  ========================= */

  app.use("/books", booksRouter);

  /* =========================
    START SERVER
  ========================= */

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });