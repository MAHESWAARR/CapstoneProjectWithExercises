const Chat = require("../models/Chat");

exports.getChatHistory = async (req, res) => {

  try {

    const chats = await Chat.find({
      $or: [
        { senderId: req.user._id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user._id }
      ]
    }).sort({ createdAt: 1 });

    res.json(chats);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};