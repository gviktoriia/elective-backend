const express = require("express");
const StudentController = require("../controllers/Student");
const router = express.Router();

router.get("/", StudentController.findAll);
router.get("/:id", StudentController.findOne);
router.post("/", StudentController.create);
router.patch("/:id", StudentController.update);
router.delete("/:id", StudentController.destroy);

module.exports = router;
