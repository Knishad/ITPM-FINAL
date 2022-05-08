const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    max: 10,
  },
  name: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    max: 50,
  },
  grade: {
    type: String,
    max: 10,
  },
  birthday: {
    type: Date,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  contactNumber: {
    type: String,
    max: 10,
  },
  enrolledSubjects: [
    {
      subjectCode: {
        type: String,
        max: 10,
      },
      subjectName: {
        type: String,
        max: 50,
      },
    },
  ],
});

module.exports = mongoose.model("Student", StudentSchema);
