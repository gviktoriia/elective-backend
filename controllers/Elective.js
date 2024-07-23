const ElectiveModel = require("../models/elective");

exports.create = async (req, res) => {
  const { title, duration, lecture, lab, tutorial } = req.body;
  console.log("Request Body:", req.body); // Log the request body

  if (
    !title ||
    !duration ||
    lecture === undefined ||
    lab === undefined ||
    tutorial === undefined
  ) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const elective = new ElectiveModel({
    title,
    duration,
    hours: {
      lecture,
      lab,
      tutorial,
    },
  });

  try {
    const data = await elective.save();
    res.send({
      message: "Elective added successfully!!",
      user: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating elective",
    });
  }
};

// Retrieve all electives from the database.
exports.findAll = async (req, res) => {
  try {
    const elective = await ElectiveModel.find();
    res.status(200).json(elective);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single elective with an id
exports.findOne = async (req, res) => {
  try {
    const elective = await ElectiveModel.findById(req.params.id);
    res.status(200).json(elective);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a elective by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await ElectiveModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Object not found.`,
        });
      } else {
        res.send({ message: "Elective updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a elective with the specified id in the request
exports.destroy = async (req, res) => {
  await ElectiveModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Object not found.`,
        });
      } else {
        res.send({
          message: "Elective deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
