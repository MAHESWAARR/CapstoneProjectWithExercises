const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deactivateUser,
  activateUser
} = require("../controllers/adminController");

const {
  approveQuestion,
  resolveQuestion,
  deleteQuestion,
  getPendingQuestions
} = require("../controllers/questionController");

const {
  getPendingAnswers,
  approveAnswer,
  deleteAnswer
} = require("../controllers/answerController");

const {
  adminDeleteComment,
  getAllComments
} = require("../controllers/commentController");

router.get("/users", protect, adminOnly, getAllUsers);

router.put("/deactivate/:id", protect, adminOnly, deactivateUser);

router.put("/activate/:id", protect, adminOnly, activateUser);

//CRUD OPS
// Delete question (Admin)
router.delete("/del-question/:id", protect, adminOnly, deleteQuestion);

router.put("/approve-question/:id", protect, adminOnly, approveQuestion);

router.put("/resolve-question/:id", protect, adminOnly, resolveQuestion);

router.get("/pending-qns", protect, adminOnly, getPendingQuestions);


// Answer Moderation

router.get("/pending-ans", protect, adminOnly, getPendingAnswers);

router.put("/approve-answer/:id", protect, adminOnly, approveAnswer);

router.delete("/delete-answer/:id", protect, adminOnly, deleteAnswer);


// ADMIN ROUTES
router.get("/comments/all", protect, adminOnly, getAllComments);

router.delete("/comments/delete/:id", protect, adminOnly, adminDeleteComment);

module.exports = router;