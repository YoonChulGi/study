const mongoose = require("mongoose");

const { Schema } = mongoose;
const Overview = new Schema(
  {
    _id: Object,
    ip: String,
    session_id: String,
    agent: String,
    refer: String,
    timestamp: Date,
    _class: String,
  },
  { collection: "visitors" }
);

module.exports = mongoose.model("visitors", Overview);
