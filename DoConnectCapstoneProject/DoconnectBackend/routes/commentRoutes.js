const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createComment,
  getComments,
  deleteOwnComment,
  adminDeleteComment,
  getAllComments
} = require("../controllers/commentController");


// USER ROUTES
router.post("/:answerId", protect, createComment);

router.get("/:answerId", getComments);

router.delete("/:id", protect, deleteOwnComment);




module.exports = router;