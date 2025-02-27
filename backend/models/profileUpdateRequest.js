const mongoose = require("mongoose");

const ProfileUpdateRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    updatedData: { type: Object, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProfileUpdateRequest",
  ProfileUpdateRequestSchema
);

//Profile Update => in Progress
