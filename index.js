const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB ElectivesApp");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

// CRUD operations students
const StudentRoute = require("./routes/Student");
app.use("/students", StudentRoute);

// CRUD operations electives
const ElectiveRoute = require("./routes/Elective");
app.use("/electives", ElectiveRoute);

// CRUD operations curriculum
const CurriculumRoute = require("./routes/Curriculum");
app.use("/curriculum", CurriculumRoute);

// AUTH
const AuthRoute = require("./routes/Auth");
app.use("/api/auth", AuthRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
