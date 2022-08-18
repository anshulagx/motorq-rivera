const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    event_name: { type: String },
    event_desc: { type: String },
    img_url: { type: String },
    event_start_timestamp: { type: Date },
    event_end_timestamp: { type: Date },
    event_lat: { type: Number },
    event_lon: { type: Number },
    event_capacity: { type: Number },
    filled: { type: Number },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Event || mongoose.model("event", schema, "event");
