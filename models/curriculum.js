const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  elective_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Elective",
    required: true,
  },
  scores: [
    {
      score: {
        type: Number,
        required: false,
      },
      date: {
        type: Date,
        required: false,
      },
    },
  ],
  final_score: {
    type: Number,
    required: false,
  },
});

curriculumSchema.index({ student_id: 1, elective_id: 1 }, { unique: true });

let Curriculum = new mongoose.model("Curriculum", curriculumSchema);
module.exports = Curriculum;
