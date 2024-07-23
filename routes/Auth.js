const express = require("express");
const authController = require("../controllers/Auth");
const router = express.Router();

router.post("/admin/login", authController.adminLogin);
router.post("/student/login", authController.studentLogin);

module.exports = router;
