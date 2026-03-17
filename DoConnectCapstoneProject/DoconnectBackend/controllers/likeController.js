const Like = require("../models/Like");
const Answer = require("../models/Answer");
const { createNotification } = require("../services/notificationService");

// LIKE ANSWER
exports.likeAnswer = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      userId: req.user._id,
      answerId: req.params.answerId,
    });

    if (existingLike) {
      return res.status(400).json({
        message: "You already liked this answer",
      });
    }

    const like = await Like.create({
      userId: req.user._id,
      answerId: req.params.answerId,
    });

    const answer = await Answer.findById(req.params.answerId);

    if (answer.userId.toString() !== req.user._id.toString()) {
      await createNotification({
        userId: answer.userId,
        type: "LIKE",
        message: "Someone liked your answer",
        referenceId: req.params.answerId,
      });
    }

    res.json({
      message: "Answer liked",
      like,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// UNLIKE ANSWER
exports.unlikeAnswer = async (req, res) => {
  try {
    await Like.findOneAndDelete({
      userId: req.user._id,
      answerId: req.params.answerId,
    });

    res.json({
      message: "Answer unliked",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET LIKE COUNT
exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.countDocuments({
      answerId: req.params.answerId,
    });

    res.json({
      likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
