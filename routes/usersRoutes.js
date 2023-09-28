const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 1. モデル（コレクション）定義
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

// このルータ専用のミドルウェア
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// 2. ルート定義
// CRUD
// READ
// 全件取得
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "ユーザの取得に失敗しました。" });
  }
});

// IDでユーザを絞りこみ
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ユーザの取得に失敗しました。" });
  }
});

// CREATE
router.post("/users", async (req, res) => {
  try {
    const addUser = req.body;
    const newUser = new User(addUser);
    await newUser.save();

    res.json({ message: "ユーザが登録されました。", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "ユーザの登録に失敗しました。" });
  }
});

// UPDATE
router.patch("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateFields = req.body;

    // ユーザを更新
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "ユーザが見つかりません。" });
    }

    res.json({ message: "ユーザが更新されました。", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "ユーザの更新に失敗しました。" });
  }
});

// DELETE
router.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "ユーザが見つかりません。" });
    }

    res.json({ message: "ユーザが削除されました。", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "ユーザの削除に失敗しました。" });
  }
});

module.exports = router;
