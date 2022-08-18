const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    google_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    gender: { type: String },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Event || mongoose.model("userProfile", schema, "userProfile");
