const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({

    Teacher_name : {
        type : String,
        required : true
    },

    Teacher_phn_number : {
        type : String,
        required : true
    },
    Teacher_email : {
        type : String,
        required : true
    },
     Subject: {
        type : String,
        required : true
    },
   

})
const Teacher = mongoose.model("Teacher",teacherSchema);

module.exports = Teacher;