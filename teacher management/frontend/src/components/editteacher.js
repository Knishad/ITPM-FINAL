import React, { useState,useEffect } from "react"
import { useParams } from "react-router";
import axios from "axios";
import swal from 'sweetalert';
import './teacher.css';



export default function Editteacher() {
    const { id } = useParams();

    const [ Teacher_name, setTeacher_name] = useState("");
    const [Teacher_phn_number, setTeacher_phn_number] = useState("");
    const [ Teacher_email, setTeacher_email] = useState("");
    const [Subject, setSubject] = useState("");

    
   

    useEffect(() => {
      async function getData(){
            const result = await axios.get(`http://localhost:3000/teacher/getTeacher/${id}`)

            let TeacherData = result.data.teacher
            if ( TeacherData) {
                setTeacher_name( TeacherData.Teacher_name);
                setTeacher_phn_number( TeacherData.Teacher_phn_number);
                setTeacher_email( TeacherData.Teacher_email);
                setSubject( TeacherData.Subject);
                
            } else {
                
            }
        }
        getData()
    }, [])

    
    function sendData(e) {
        e.preventDefault();

        const newTeacher = {
            Teacher_name,
          Teacher_phn_number,
          Teacher_email,
          Subject
        }
        axios.put(`http://localhost:3000/teacher/updateTeacher/${id}`, newTeacher).then(() => {
            alert("Teacher Updated")
            swal({
                title: "Success!",
                text: "Teacher details Updated Successfully",
                icon: "success",
                button: "Ok",
              });
            window.location = "/allTeacher"

        }).catch((err) => {
            console.log(err.message)
            alert(err)
        })

    }

return (

    <div className = "container">
    <br></br>
    <br></br>
    <br></br>
      <h1><center> Update Teacher Details</center></h1>
    <br></br>
    <br></br>
      <form onSubmit={sendData}>
    <  div className="mb-3">
  <label for="Teacher_name" className="form-label">Teacher name</label>
<input required type="string" class="form-control" id="Teacher_name"value={Teacher_name} onChange ={(e)=>{
 
  setTeacher_name(e.target.value);
}} ></input>

</div>
<div className="mb-3">
  <label for="Teacher_phn_number" className="form-label">Contact No</label>
<input required type="string" class="form-control" id="Teacher_phn_number"value={Teacher_phn_number} onChange ={(e)=>{

setTeacher_phn_number(e.target.value);
}}></input>
</div>

<div className="mb-3">
  <label for="Teacher_email" className="form-label">E mail</label>
<input required type="string" class="form-control" id="Teacher_email" value={Teacher_email} onChange ={(e)=>{

setTeacher_email(e.target.value);
}}></input>
</div>

<div className="mb-3">
  <label for="Subject" className="form-label">Subject</label>
<input required type="string" class="form-control" id="Subject" value={Subject} onChange ={(e)=>{

setSubject(e.target.value);
}}></input>
</div>

<div className = "form-group">
            <input type = "submit" value = "Create" className = "btn btn-primary"/>
            </div> 
            </form > 
            </div>


)
}