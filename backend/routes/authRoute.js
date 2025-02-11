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
  updateProfile,
  bookAppointment,
  getAppointmentsByUserId,
  cancelAppointment,
} = require("../controllers/authController");
const userAuth = require("../middleware/userAuth");
const upload = require("../middleware/multer");
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

router.post("/update-profile", upload.single("image"), userAuth, updateProfile);

router.post("/book-appointment", userAuth, bookAppointment);

router.get("/appointments", userAuth, getAppointmentsByUserId);

router.post("/cancel-appointment", userAuth, cancelAppointment);

//get user by user id [GET]
// router.get("/:id", getUserById);

module.exports = router;
