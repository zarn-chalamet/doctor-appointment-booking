const express = require("express");
const upload = require("../middleware/multer");
const { addDoctor } = require("../controllers/adminController");

const router = express.Router();

router.post("/add-doctor", upload.single("image"), addDoctor);

module.exports = router;
