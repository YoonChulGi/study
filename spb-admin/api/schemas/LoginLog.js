const mongoose = require("mongoose");

const { Schema } = mongoose;
const LoginLogSchema = new Schema(
  {
    _id: Object,
    user_id: String,
    user_ip: String,
    timestamp: Date,
    _class: String,
  },
  { collection: "login-log" }
);

module.exports = mongoose.model("login-log", LoginLogSchema);
