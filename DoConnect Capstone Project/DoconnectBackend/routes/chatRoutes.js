const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getChatHistory } = require("../controllers/chatController");

router.get("/:userId", protect, getChatHistory);

module.exports = router;