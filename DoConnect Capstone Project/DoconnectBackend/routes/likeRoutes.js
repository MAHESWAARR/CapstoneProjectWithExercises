const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  likeAnswer,
  unlikeAnswer,
  getLikes
} = require("../controllers/likeController");


router.post("/:answerId", protect, likeAnswer);

router.delete("/:answerId", protect, unlikeAnswer);

router.get("/:answerId", getLikes);

module.exports = router;