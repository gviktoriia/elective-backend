const express = require("express");
const ElectiveController = require("../controllers/Elective");
const router = express.Router();

router.get("/", ElectiveController.findAll);
router.get("/:id", ElectiveController.findOne);
router.post("/", ElectiveController.create);
router.patch("/:id", ElectiveController.update);
router.delete("/:id", ElectiveController.destroy);

module.exports = router;
