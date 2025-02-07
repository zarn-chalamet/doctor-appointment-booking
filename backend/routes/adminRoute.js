const express = require("express");
const upload = require("../middleware/multer");
const { addDoctor, loginAdmin } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);

module.exports = router;
