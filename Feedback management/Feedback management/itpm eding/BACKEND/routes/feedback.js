const router = require("express").Router();
let Feedback = require("../models/Feedback");

router.route("/addfeed").post((req,res)=>{

    const Student_Name = req.body. Student_Name;
    const Student_RegNo = req.body.Student_RegNo;
    const Subject  = req.body.Subject;
    const Massage = req.body. Massage;

    const newFeedback = new Feedback({

        Student_Name,
        Student_RegNo,
        Subject,
        Massage
        
    })

    newFeedback.save().then(()=>{

        res.json("Feedback Details Added")

    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/allfeed").get((req,res)=>{

    Feedback.find().then((feedback)=>{

        res.json(feedback)

    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/updatefeed/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {Student_Name, Student_RegNo,Subject, Massage} = req.body;

    const updateFeedback = {
        Student_Name,
        Student_RegNo,
        Subject,
        Massage
        

    }
    const update = await Feedback.findByIdAndUpdate(userId, updateFeedback).then(()=>{
        res.status(200).send({status: "details updated" })  
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

})
router.route("/deletefeed/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Feedback.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "details Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delelte", error: err.message});
    })
})
router.route("/getfeed/:id").get(async(req,res)=>{
    let userId = req.params.id;
   const user =  await Feedback.findById(userId).then((feedback)=>{
        res.status(200).send({status:"details fetched", feedback});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with user", error : err.message});
    })
})

module.exports = router;