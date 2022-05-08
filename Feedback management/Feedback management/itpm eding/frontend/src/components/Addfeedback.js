import React,{useState} from "react";
import axios from "axios";
import './feedback.css';


 export default function Addfeedback(){
     const [ Student_Name, SetStudent_Name] = useState("");
     const [Student_RegNo, SetStudent_RegNo,] = useState("");
     const [Subject, SetSubject] = useState("");
     const [ Massage, SetMassage] = useState("");
     

    function sendData(e){
        e.preventDefault()

        const Addfeedback = {
            Student_Name,
            Student_RegNo,
            Subject,
            Massage,
           
        }
        
        axios.post("http://localhost:3001/feedback/addfeed", Addfeedback).then(()=>{
            alert("feedback added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(

        <div className = "container">
          <br></br>
          <br></br>
          <br></br>
            <h1><center> <b>Feedback Details </b></center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for="Student_Name" class="form-label"><h5> <b>Student_Name</b></h5> </label>
    <input required type="string" class="form-control" id="Student_Name" onChange ={(e)=>{

        SetStudent_Name(e.target.value);
    }} ></input>
   
  </div>

  <div class="mb-3">
    <label for=" Student_RegNo" class="form-label"> <h5><b> Student_RegNo</b></h5></label>
    <input required type="string" class="form-control" id=" Student_RegNo" onChange ={(e)=>{

    SetStudent_RegNo(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for="Subject" class="form-label"> <h5><b>Subject</b></h5></label>
    <input required type="string" class="form-control" id="Subject" onChange ={(e)=>{

    SetSubject(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="Massage" class="form-label"> <h5><b>Massage</b></h5></label>
    <input required type="string" class="form-control" id="Massage" onChange ={(e)=>{

    SetMassage(e.target.value);
}}></input>
  </div>

<button type="submit" class="btn btn-primary" > <b>Add Feedback </b> </button>


</form>


    
     
        </div>
    )
}