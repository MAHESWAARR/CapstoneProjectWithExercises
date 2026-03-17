const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// REGISTER USER
exports.registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user,
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Server error",
    });
  }
};


// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    // Safety check
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing"
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user,
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Server error",
    });
  }
};