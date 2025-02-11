const express = require("express");
const upload = require("../middleware/multer");
const {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  getAllAppointments,
} = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const { changeAvailability } = require("../controllers/doctorController");

const router = express.Router();

router.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);
router.post("/all-doctors", adminAuth, getAllDoctors);
router.post("/change-availability", adminAuth, changeAvailability);
router.post("/appointments", adminAuth, getAllAppointments);

module.exports = router;
