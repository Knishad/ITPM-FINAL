const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ETutorSchema = new Schema({

    pandemictype: {
        type : String,
        required : true
    },

    pandemicname : {
        type : String,
        required : true
    },
    area : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
 
    }
    

})
const ETutor = mongoose.model("E-Tutor",ETutorSchema);

module.exports = ETutor ;