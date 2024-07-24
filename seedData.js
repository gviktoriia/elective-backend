const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const Admin = require("./models/admin"); // Adjust path to Admin model
const Student = require("./models/student"); // Adjust path to Student model
const Elective = require("./models/elective"); // Adjust path to Elective model
const Curriculum = require("./models/curriculum"); // Adjust path to Curriculum model

// Example Data
const admins = [
  { username: "admin", password: bcrypt.hashSync("adminpass", 8) },
];

const students = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    card: "CI78239756",
    department: "FPrN",
    level: 2,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    card: "CI78239757",
    department: "IT",
    level: 1,
  },
];

const electives = [
  {
    title: "Introduction to Machine Learning",
    duration: 1,
    hours: { lecture: 30, lab: 15, tutorial: 10 },
  },
  {
    title: "Advanced Algorithms",
    duration: 1,
    hours: { lecture: 40, lab: 20, tutorial: 15 },
  },
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing data
    await Admin.deleteMany({});
    await Student.deleteMany({});
    await Elective.deleteMany({});
    await Curriculum.deleteMany({});

    // Insert new data
    const [admin] = await Admin.insertMany(admins);
    const [student1, student2] = await Student.insertMany(students);
    const [elective1, elective2] = await Elective.insertMany(electives);

    // Create curriculums using ObjectId from inserted documents
    const curriculums = [
      {
        student_id: student1._id,
        elective_id: elective1._id,
        scores: [{ score: 85, date: new Date() }],
        final_score: 85,
      },
      {
        student_id: student2._id,
        elective_id: elective2._id,
        scores: [{ score: 90, date: new Date() }],
        final_score: 90,
      },
    ];

    await Curriculum.insertMany(curriculums);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
