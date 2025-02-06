const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter username"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: [true, "Email address already registered"],
  },
  password: {
    type: String,
    min: 6,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0,
  },
  image: { type: String, default: "" },
  address: { type: Object },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "00000000" },
});

module.exports = mongoose.model("User", userSchema);
