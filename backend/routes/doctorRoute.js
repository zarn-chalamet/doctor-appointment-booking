const express = require("express");
const {
  getDoctorById,
  loginDoctor,
  appointmentsByDoctor,
  getCurrentDoctor,
} = require("../controllers/doctorController");
const { getAllDoctors } = require("../controllers/adminController");
const doctorAuth = require("../middleware/doctorAuth");

const router = express.Router();

router.get("/list", getAllDoctors);

router.get("/:id", getDoctorById);

router.post("/login", loginDoctor);

router.post("/appointments", doctorAuth, appointmentsByDoctor);

router.post("/current-doctor", doctorAuth, getCurrentDoctor);

// router.post("/user", getCurrentUser);

module.exports = router;
