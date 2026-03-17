const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getUserById , getAllUsers } = require("../controllers/userController");

router.get("/", protect, getAllUsers)
router.get("/:id", protect, getUserById);

module.exports = router;