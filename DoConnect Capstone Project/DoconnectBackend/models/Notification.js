const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["ANSWER", "COMMENT", "LIKE", "CHAT", "ADMIN"],
      required: true
    },

    message: {
      type: String,
      required: true
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId
    },

    isRead: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);