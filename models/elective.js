let mongoose = require("mongoose");

let electiveSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  hours: {
    lecture: {
      type: Number,
      required: true,
    },
    lab: {
      type: Number,
      required: true,
    },
    tutorial: {
      type: Number,
      required: true,
    },
  },
});

let elective = new mongoose.model("Elective", electiveSchema);
module.exports = elective;
