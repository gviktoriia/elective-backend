const express = require("express");
const CurriculumController = require("../controllers/Curriculum");
const router = express.Router();

router.get("/", CurriculumController.findAll);
router.get("/:id", CurriculumController.findOne);
router.post("/", CurriculumController.create);
router.patch("/:id", CurriculumController.update);
router.delete("/:id", CurriculumController.destroy);
router.get("/student-counts", CurriculumController.getElectiveStudentCounts);

module.exports = router;
