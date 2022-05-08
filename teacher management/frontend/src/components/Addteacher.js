import React,{useState} from "react";
import axios from "axios";
import './teacher.css';
import swal from 'sweetalert';



export default function Addteacher(){
    const [ Teacher_name, SetTeacher_name] = useState("");
    const [Teacher_phn_number, SetTeacher_phn_number] = useState("");
    const [ Teacher_email, SetTeacher_email] = useState("");
    const [Subject, SetSubject] = useState("");

    function sendData(e){
      // swal({
      //   title: "Success!",
      //   text: "teacher Successfully Added",
      //   icon: "success",
      //   button: "Ok",
      // });
        e.preventDefault()

        const newTeacher = {
          Teacher_name,
          Teacher_phn_number,
          Teacher_email,
          Subject
      
        }
        
        axios.post("http://localhost:3000/teacher/addTeacher",newTeacher).then(()=>{
          swal({
            title: "Success!",
            text: "teacher Successfully Added",
            icon: "success",
            button: "Ok",
          });  
           // alert("user added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        <div className="container">
        <h1><center> Add Teacher</center></h1>
        <br></br>
        <br></br>
      <form onSubmit={sendData}>
<div className="mb-3">
  <label for="Teacher_name" className="form-label">Teacher name</label>
  <input required type="string" className="form-control" id="Teacher_name" onChange={(e)=>{
      SetTeacher_name(e.target.value);
  }}/>
  
</div>



<div className="mb-3">
  <label for="Teacher_phn_number" className="form-label">Contact No</label>
  <input required type="string" className="form-control" id="Teacher_phn_number" onChange={(e)=>{
      SetTeacher_phn_number(e.target.value);
  }} />
 
</div>


<div className="mb-3">
  <label for=" Teacher_email" className="form-label">E mail</label>
  <input required type="string" className="form-control" id=" Teacher_email" onChange={(e)=>{
      SetTeacher_email(e.target.value);
  }} />
  
</div>

<div className="mb-3">
  <label for="Subject" className="form-label">Subject</label>
  <input required type="string" className="form-control" id="Subject" onChange={(e)=>{
      SetSubject(e.target.value);
  }} />
  
</div>
<center>
<button type="submit" className="btn btn-primary">Confirm</button>
</center>
</form>
</div>
  )
}