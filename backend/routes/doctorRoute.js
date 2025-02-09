const express = require("express");
const {} = require("../controllers/doctorController");
const { getAllDoctors } = require("../controllers/adminController");
const router = express.Router();

router.get("/list", getAllDoctors);

module.exports = router;
