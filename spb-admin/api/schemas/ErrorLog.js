const mongoose = require("mongoose");

const { Schema } = mongoose;
const ErrorLogSchema = new Schema(
  {
    _id: Object,
    user_id: String,
    user_ip: String,
    status: Number,
    message: String,
    exception: String,
    timestamp: Date,
    _class: String,
  },
  { collection: "error-log" }
);

module.exports = mongoose.model("error-log", ErrorLogSchema);
