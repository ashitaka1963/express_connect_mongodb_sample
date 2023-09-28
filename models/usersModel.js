const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
