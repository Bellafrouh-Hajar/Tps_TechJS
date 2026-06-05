    const mongoose = require("mongoose");

    // Schema utilisateur
    const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    });

    // Export model
    module.exports = mongoose.model("User", userSchema);