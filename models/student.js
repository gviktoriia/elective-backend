let mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  level: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  card: {
    type: String,
    required: true,
    unique: true,
  },
});

let student = new mongoose.model("Student", studentSchema);
module.exports = student;
