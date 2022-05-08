const TeacherRouter = require("express").Router();
let Teacher = require("../models/Teacher");

TeacherRouter.route("/addTeacher").post((req,res)=>{

    const  Teacher_name = req.body. Teacher_name;
    const Teacher_phn_number  = req.body.Teacher_phn_number ;
    const  Teacher_email = req.body.Teacher_email;
    const Subject = req.body.Subject;

    const newTeacher = new  Teacher({

         Teacher_name, 
       Teacher_phn_number ,
         Teacher_email,
        Subject
    })


    newTeacher.save().then(()=>{

        res.json("Teacher Added")

    }).catch((err)=>{

        console.log(err);
    })

})

TeacherRouter.route("/allTeacher").get((req,res)=>{

    Teacher.find().then((teacher)=>{

        res.json(teacher)

    }).catch((err)=>{
        console.log(err)
    })
})

//update
TeacherRouter.route("/updateTeacher/:id").put(async(req,res)=> {
    let userId = req.params.id;
    const {Teacher_name,Teacher_phn_number , Teacher_email, Subject}= req.body;

    const updateTeacher = {
        Teacher_name,
        Teacher_phn_number , 
        Teacher_email,
         Subject
        
    }
    const update = await Teacher.findByIdAndUpdate(userId,updateTeacher)
    .then(()=> {
        res.status(200).send({status:"Teacher detail updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message})
    })
})


TeacherRouter.route("/deleteTeacher/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Teacher.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Teacher Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delelte", error: err.message});
    })
})
TeacherRouter.route("/getTeacher/:id").get(async(req,res)=>{
    let userId = req.params.id;
   const user =  await Teacher.findById(userId).then((teacher)=>{
        res.status(200).send({status:"USer fetched", teacher});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with user", error : err.message});
    })
})




module.exports = TeacherRouter;