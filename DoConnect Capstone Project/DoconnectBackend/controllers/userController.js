const User = require("../models/User");

exports.getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find({
      _id: { $ne: req.user._id }
    }).select("name email");

    res.json({
      users
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};