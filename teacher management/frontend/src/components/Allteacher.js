import React,{useState,useEffect} from "react";
import axios from "axios";
import './Addteacher.css';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"

 
import swal from 'sweetalert';

export default function AllTeacher(){

    const [teacher,setTeachers] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deleteTeacher=(id) =>{
        axios.delete(`http://localhost:3000/teacher/deleteTeacher/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Details Will be Deleted from Item List",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("The file has been deleted!", 
                    "success",
                  );  setTimeout(function(){
                    window.location.reload();
                   },1000);
                } else {
                  swal("File Is Not Deleted");
                }
              });
        // ;
        })
      }



    useEffect(() => {
        
        function getTeachers(){
        axios.get("http://localhost:3000/teacher/allTeacher").then((res) => {
            setTeachers(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getTeachers();
    }, [])
// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Teacher name","Teacher phn_number" , "Teacher email", "Subject" ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.Teacher_name,
            ticket.Teacher_phn_number ,
            ticket.Teacher_email,
            ticket.Subject
            
             
        ];
        tableRows.push(ticketData);
    })
    doc.text("E-tutor online", 70, 8).setFontSize(13);
    <br></br>
    doc.text("Teachers Deatils Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Teacher Deatils Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(teacher)} >Teachers Deatils Report</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3> TEACHERS MANAGEMENT</h3>
               
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
   <br></br>
   <div>  <button type="text" class="btnq btnq--skew btnq-default"><Link to="/addTeacher" className="nav-link">Add Teachers Details</Link></button></div>
   <br></br>
   
   <button type="text" class="btnq btnq--skew btnq-default">  Teachers Count : {teacher.length} </button>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                             <th>Teacher name</th>
                            <th> Teacher phn_number</th> 
                            <th> Teacher email</th>
                            <th>Subject</th>
                           <th>Delete</th>
                           <th>Edit</th>

                       </tr>
                   </thead>
                   <tbody>
                   {
                           teacher.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.Teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.Teacher_name }</td> 
                                   <td >{f.Teacher_phn_number} </td>
                                   <td >{f.Teacher_email} </td>
                                   <td >{f.Subject} </td>
                                   
                                    
                                   <td > <button className="btn btn-danger" onClick={() =>{deleteTeacher(f._id)}}>Delete</button>
                                       
               
</td>
                                   <td>  <button className="btn btn-danger"><Link to={"/editteacher/"+ f._id } >Edit</Link></button>



</td>

    

                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
                     
               
                   
</div>
</div>

       </>
   
   )








}