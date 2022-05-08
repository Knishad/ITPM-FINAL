const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    Student_Name : {
        type : String,
        required : true
    },

    Student_RegNo : {
        type : String,
        required : true
    },
    Subject: {
        type : String,
        required : true
    },
    Massage: {
        type : String,
        required : true
    
   
    }

});
const Feedback= mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;