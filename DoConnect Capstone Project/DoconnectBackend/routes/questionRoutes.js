const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createQuestion,
  getQuestions,
  searchQuestions,
} = require("../controllers/questionController");


// Ask question
router.post("/", protect, createQuestion);

// Get questions
router.get("/", getQuestions);

// Search questions
router.get("/search", searchQuestions);


module.exports = router;