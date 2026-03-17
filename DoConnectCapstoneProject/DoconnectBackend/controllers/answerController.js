const Answer = require("../models/Answer");
const Question = require("../models/Question");

const Notification = require("../models/Notification");
const { createNotification } = require("../services/notificationService");

// CREATE ANSWER
exports.createAnswer = async (req, res) => {
  try {

    const { answers } = req.body;

    const answerBody = await Answer.create({
      questionId: req.params.questionId,
      userId: req.user._id,
      answers
    });
    const question = await Question.findById(req.params.questionId);
    
    
      await createNotification({
      userId: question.userId,
      type: "ANSWER",
      message: "Someone answered your question",
      referenceId: answerBody._id
    });

    res.status(201).json({
      message: "Answer submitted and Waiting for approval by ADMIN",
      answerBody
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET ANSWERS FOR A QUESTION
exports.getAnswers = async (req, res) => {
  try {

    const answersBody = await Answer.find({
      questionId: req.params.questionId,
      isApproved: true
    }).populate("userId", "name");

    res.json({
      count: answersBody.length,
      answersBody
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

//ADMIN OPS
exports.getPendingAnswers = async (req, res) => {
  try {

    const answers = await Answer.find({
      isApproved: false
    })
      .populate("userId", "name email")
      .populate("questionId", "title");

    res.json({
      count: answers.length,
      answers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.approveAnswer = async (req, res) => {
  try {

    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json({
      message: "Answer approved successfully",
      answer
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {

    await Answer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Answer deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};