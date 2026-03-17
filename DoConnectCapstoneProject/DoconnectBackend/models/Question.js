const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    topic: {
      type: String
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    isApproved: {
      type: Boolean,
      default: false
    },

    qnsStatus: {
        type : String,
        enum : [ 'OPEN' , 'RESOLVED' ],
        default : 'OPEN'
    }


  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);