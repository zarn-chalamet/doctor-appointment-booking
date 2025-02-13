const express = require("express");
const {
  getDoctorById,
  loginDoctor,
  appointmentsByDoctor,
  getCurrentDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  changeAvailability,
} = require("../controllers/doctorController");
const { getAllDoctors } = require("../controllers/adminController");
const doctorAuth = require("../middleware/doctorAuth");

const router = express.Router();

router.get("/list", getAllDoctors);

router.get("/:id", getDoctorById);

router.post("/login", loginDoctor);

router.post("/appointments", doctorAuth, appointmentsByDoctor);

router.post("/current-doctor", doctorAuth, getCurrentDoctor);

router.post("/complete-appointment", doctorAuth, appointmentComplete);

router.post("/cancel-appointment", doctorAuth, appointmentCancel);

router.post("/dashboard", doctorAuth, doctorDashboard);

router.post("/change-availability", doctorAuth, changeAvailability);

// router.post("/user", getCurrentUser);

module.exports = router;
