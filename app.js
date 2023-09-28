const express = require("express");
const mongoose = require("mongoose");

const app = express();

// POSTリクエストを処理するためのミドルウェア
app.use(express.json());

// MongoDBに接続
const DATABASE_NAME = "HelloMongo";

mongoose
  .connect(`mongodb://127.0.0.1:27017/${DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// ルートエンドポイントの設定
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// サーバーの起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

// CRUD
// READ
// 全件取得
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "ユーザの取得に失敗しました。" });
  }
});

// IDでユーザを絞りこみ
app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ユーザの取得に失敗しました。" });
  }
});

// CREATE
app.post("/users", async (req, res) => {
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
app.patch("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateFields = req.body;

    console.log(userId, updateFields);

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
app.delete("/users/:userId", async (req, res) => {
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
