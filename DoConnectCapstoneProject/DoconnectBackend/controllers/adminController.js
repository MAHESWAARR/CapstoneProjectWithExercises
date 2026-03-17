//In this ADMIN can deact/act USER and get all the USERS

const User = require("../models/User");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      users
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// DEACTIVATE USER
exports.deactivateUser = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select("-password");

    res.json({
      message: "User deactivated successfully",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// ACTIVATE USER
exports.activateUser = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    ).select("-password");

    res.json({
      message: "User activated successfully",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};