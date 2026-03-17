const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from DB
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

module.exports = protect;