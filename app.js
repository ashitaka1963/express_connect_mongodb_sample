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

// サーバーの起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const userRoutes = require("./routes/usersRoutes");
app.use(userRoutes);