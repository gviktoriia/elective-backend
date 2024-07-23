const CurriculumModel = require("../models/curriculum");

exports.create = async (req, res) => {
  const { student_id, elective_id, scores, final_score } = req.body;
  console.log("Request Body:", req.body); // Log the request body

  if (!student_id || !elective_id || !scores || !final_score) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const existingRecord = await CurriculumModel.findOne({
    student_id,
    elective_id,
  });
  if (existingRecord) {
    return res
      .status(400)
      .send({ message: "Student is already registered for this elective." });
  }

  const curriculum = new CurriculumModel({
    student_id,
    elective_id,
    scores: {
      score,
      date,
    },
    final_score,
  });

  try {
    const data = await curriculum.save();
    res.send({
      message: "Curriculum added successfully!!",
      user: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating curriculum",
    });
  }
};

// Retrieve all curriculum from the database.
// In your curriculum controller

exports.findAll = async (req, res) => {
  try {
    // Get elective_id from query parameters
    const electiveId = req.query.elective_id;

    let query = {};
    if (electiveId) {
      query.elective_id = electiveId; // Add filtering criteria
    }

    const curriculum = await CurriculumModel.find(query)
      .populate("student_id")
      .populate("elective_id");

    res.status(200).json(curriculum);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single curriculum with an id
exports.findOne = async (req, res) => {
  try {
    const curriculum = await CurriculumModel.findById(req.params.id)
      .populate("student_id")
      .populate("elective_id");
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a curriculum by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await CurriculumModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Curriculum not found.`,
        });
      } else {
        res.send({ message: "Curriculum updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a curriculum with the specified id in the request
exports.destroy = async (req, res) => {
  await CurriculumModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Curriculum not found.`,
        });
      } else {
        res.send({
          message: "Curriculum deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};


exports.getElectiveStudentCounts = async (req, res) => {
  try {
    // Group by elective_id and count the number of students
    const counts = await CurriculumModel.aggregate([
      {
        $group: {
          _id: "$elective_id",
          studentCount: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
