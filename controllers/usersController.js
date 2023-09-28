const User = require("../models/usersModel");

// ユーザー一覧取得
exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "ユーザの取得に失敗しました。" });
  }
};

// ユーザー取得（ByUserId）
exports.getUserByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "ユーザの取得に失敗しました。" });
  }
};

// ユーザー作成
exports.createUser = async (req, res) => {
  try {
    const addUser = req.body;
    const newUser = new User(addUser);
    await newUser.save();

    res.json({ message: "ユーザが登録されました。", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "ユーザの登録に失敗しました。" });
  }
};

// ユーザー更新
exports.updateUser = async (req, res) => {
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
};

// ユーザー削除
exports.deleteUser = async (req, res) => {
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
};
