const router = require("express").Router();
const ApiResult = require("../../models/Common/ApiResult");
const StudentsModel = require("../../models/Students/StudentsModel");
const SubjectsModel = require("../../models/Subjects/SubjectsModel");
const moment = require('moment'); 

router.get("/getData", async (req, res) => {

  if(resStudent.birthday !== undefined) resStudent.birthday = moment(resStudent.birthday).format("YYYY-MM-DD");

  if(resSubject.length > 0) resSubject.map((sub)=>{ sub.isEnroll = false});

  if ( resStudent.enrolledSubjects !== undefined && resStudent.enrolledSubjects.length > 0 ) {
    resStudent.enrolledSubjects.map(async (enr) => {
      resSubject.map(async (sub) => {
        if (enr.subjectCode === sub.subjectCode) {
          sub.isEnroll = true;
        }
      });
    });
  }

  if (resStudent)
    return res.send(
      new ApiResult(true, { objStudent: resStudent, arrSubject: resSubject })
    );
  else return res.send(new ApiResult(false, "No data found"));
});

router.post("/updateStudentInfo", async (req, res) => {

  await StudentsModel.findOneAndDelete({ studentID: req.body.studentID});
  const resSave = await new StudentsModel(req.body).save();
  if (!resSave) return res.send(new ApiResult(false, resSave));
  else return res.send(new ApiResult(true, "Succesfully saved !"));
});

router.get("/getStudents", async (req, res) => {

  const resStudent = await StudentsModel.find().lean();
  
  if (resStudent.length > 0){
    resStudent.map((std)=>{
      std.registerDate = moment(std.registerDate).format("YYYY-MM-DD");
      if(std.birthday !== undefined) std.birthday = moment(std.birthday).format("YYYY-MM-DD");
    });

    return res.send( new ApiResult(true, resStudent) );
  }
  else return res.send(new ApiResult(false, "No data found"));
});

router.post("/removeStudent", async (req, res) => {

  const resDelete = await StudentsModel.findOneAndDelete({ studentID: req.body.studentID});
  if (!resDelete) return res.send(new ApiResult(false, resDelete));
  else return res.send(new ApiResult(true, "Succesfully deleted !"));
});

module.exports = router;
