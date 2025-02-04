const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} = require("../controllers/authController");
const userAuth = require("../middleware/userAuth");
const router = express.Router();

//register user [POST]
router.post("/register", registerUser);

//login user [POST]
router.post("/login", loginUser);

//logout
router.post("/logout", logout);

//send email verify otp
router.post("/send-verify-otp", userAuth, sendVerifyOtp);

//verify email
router.post("/verify-account", userAuth, verifyEmail);

//check if authenticated or not
router.get("/is-auth", userAuth, isAuthenticated);

router.post("/send-reset-otp", sendResetOtp);

router.post("/reset-password", resetPassword);

//get current user [GET]
router.get("/user-data", userAuth, getCurrentUser);

//get user by user id [GET]
// router.get("/:id", getUserById);

module.exports = router;
