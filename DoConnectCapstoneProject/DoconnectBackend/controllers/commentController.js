const Comment = require("../models/Comment");

const Answer = require("../models/Answer"); //Notification on comment Answer
const { createNotification } = require("../services/notificationService");
const User = require('../models/User')


// CREATE COMMENT
exports.createComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const newComment = await Comment.create({
      userId: req.user._id,
      answerId: req.params.answerId,
      comment,
    });
    const answer = await Answer.findById(req.params.answerId);

    if (answer.userId.toString() !== req.user._id.toString()) {
      await createNotification({
        userId: answer.userId,
        type: "COMMENT",
        message: `${req.user.name} is commented on your answer`,
        referenceId: answer._id,
      });
    }

    res.status(201).json({
      message: `${req.user.name}Comment added successfully`,
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET COMMENTS OF AN ANSWER
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      answerId: req.params.answerId,
    }).populate("userId", "name");

    res.json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE OWN COMMENT
exports.deleteOwnComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can delete only your comment",
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ADMIN DELETE COMMENT
exports.adminDeleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Comment removed by admin",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ADMIN VIEW ALL COMMENTS
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userId", "name email")
      .populate("answerId", "answers");

    res.json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
