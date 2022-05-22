import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './AddETute.js';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
import { Button } from "react-bootstrap";
 
import swal from 'sweetalert';

export default function AllBook(){

    const [ETutor,setETutor] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deleteBook=(id) =>{
        axios.delete(`http://localhost:3000/ETutor/delete/${id}`).then(()=>{
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
        
        function getETutors(){
        axios.get("http://localhost:3000/ETutor/all").then((res) => {
            setETutor(res.data);
            }
        ).catch((err) => {
            alert(err.message);
        })
    }
    getETutors();
    }, [])
// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Book Type", "Name", "type", "batchno", "quantity","publisherNo", ];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.Booktype,
            ticket.name,
            ticket.type,
            ticket.batchno,
            ticket.quantity,
            ticket.publisherNo,
            
             
        ];
        tableRows.push(ticketData);
    })
    doc.text("ETutor online", 70, 8).setFontSize(13);
    <br></br>
    doc.text("Book Deatils Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("ETUTE Deatils Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(ETutor)} >ETUTE Deatils Report</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3> BOOK MANAGEMENT</h3>
               
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
   <br></br>
   <div>  <button type="text" class="btnq btnq--skew btnq-default"><Link to="/add" className="nav-link">Add ETUTE Details</Link></button></div>
   <br></br>
   
   <button type="text" class="btnq btnq--skew btnq-default">  ETutes Count : {ETutor.length} </button>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                           <th >Book Type</th>
                           <th> Name</th>
                           <th>type</th>
                           <th>batchno</th>
                           <th>quantity</th>
                           <th>publisherNO</th>
                           

                       </tr>
                   </thead>
                   <tbody>
                   {
                           ETutor.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.pandemictid.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f. booktype}</td>
                                   <td >{f. name} </td>
                                   <td >{f. type} </td>
                                   <td >{f. batchno} </td>
                                   <td >{f. quantity} </td>
                                   <td >{f. publisherNo} </td>
                                   
                                    

                                   <td > <IconButton aria-label="delete"  onClick={() =>deleteBook  (f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>

       <td >

     <button><Link to={"/edit/"+ f._id} className="nav-link">Edit</Link></button>



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