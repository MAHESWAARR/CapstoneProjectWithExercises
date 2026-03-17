const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createAnswer,
  getAnswers
} = require("../controllers/answerController");


// Answer a question
router.post("/:questionId", protect, createAnswer);

// Get answers of a question
router.get("/:questionId", getAnswers);

module.exports = router;