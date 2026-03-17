const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true
    },

    comment: {
      type: String,
      required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);