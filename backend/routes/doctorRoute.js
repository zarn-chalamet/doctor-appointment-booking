const express = require("express");
const { getDoctorById } = require("../controllers/doctorController");
const { getAllDoctors } = require("../controllers/adminController");
const router = express.Router();

router.get("/list", getAllDoctors);

router.get("/:id", getDoctorById);

module.exports = router;
