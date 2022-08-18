const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "userProfile",
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "event",
    },
    ticket: { type: String, unique: true },
    ticket_used: {type: Boolean, default: false}
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Event || mongoose.model("userEvent", schema, "userEvent");
