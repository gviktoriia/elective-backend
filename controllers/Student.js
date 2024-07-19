const StudentModel = require("../models/student");

exports.create = async (req, res) => {
  if (
    !req.body.name &&
    !req.body.department &&
    !req.body.level &&
    !req.body.email &&
    !req.body.card
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  const student = new StudentModel({
    name: req.body.name,
    department: req.body.department,
    level: req.body.level,
    email: req.body.email,
    card: req.body.card,
  });

  await student
    .save()
    .then((data) => {
      res.send({
        message: "Student added successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating student",
      });
    });
};

// Retrieve all students from the database.
exports.findAll = async (req, res) => {
  try {
    const student = await StudentModel.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single student with an id
exports.findOne = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a student by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await StudentModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "Student updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a student with the specified id in the request
exports.destroy = async (req, res) => {
  await StudentModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "Student deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
