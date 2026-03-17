const Question = require("../models/Question");
const User = require('../models/User')
const { createNotification } = require("../services/notificationService");

// ASK QUESTION
exports.createQuestion = async (req, res) => {
  try {

    const { title, description, topic } = req.body;

    const question = await Question.create({
      title,
      description,
      topic,
      userId: req.user._id
    });

    res.status(201).json({
      message: "Question submitted & Waiting for approval",
      question
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET ALL APPROVED QUESTIONS
exports.getQuestions = async (req, res) => {
  try {

    const questions = await Question.find({ isApproved: true })
      .populate("userId", "name email");

    res.json({
      count: questions.length,
      questions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// SEARCH QUESTIONS
exports.searchQuestions = async (req, res) => {
  try {

    const keyword = req.query.q;

    const questions = await Question.find({
      title: { $regex: keyword, $options: "i" },
      isApproved: true
    });

    res.json({
      count: questions.length,
      questions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// DELETE QUESTION (ADMIN)
exports.deleteQuestion = async (req, res) => {
  try {

    await Question.findByIdAndDelete(req.params.id);

    res.json({
      message: "Question deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

//APPROVE QUESTIONS BY ADMIN
exports.approveQuestion = async (req, res) => {
  try {

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate("userId", "name");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    await createNotification({
      userId: question.userId,
      type: "ADMIN",
      message: "Your question has been approved",
      referenceId: question._id
    });

    res.json({
      message: `${question.userId.name}'s Question approved successfully`,
      question
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
//RESOLVE QNS STATUS BY ADMIN
exports.resolveQuestion = async (req, res) => {
  try {

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { qnsStatus: "RESOLVED" },
      { new: true }
    );

    res.json({
      message: "Question marked as RESOLVED",
      question
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

//GET PENDING APPROVAL STATUS QUESTION BY ADMIN
exports.getPendingQuestions = async (req, res) => {
  try {

    const questions = await Question.find({
      isApproved: false
    }).populate("userId", "name email");

    res.json({
      count: questions.length,
      questions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};