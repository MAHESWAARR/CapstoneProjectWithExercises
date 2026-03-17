const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
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
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", likeSchema);