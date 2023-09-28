const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");

// このルータ専用のミドルウェア
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// ルート定義
router.get("/users", userController.getUser);
router.get("/users/:userId", userController.getUserByUserId);
router.post("/users", userController.createUser);
router.patch("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
