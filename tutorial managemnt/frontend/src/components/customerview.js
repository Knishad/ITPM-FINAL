import React,{useState,useEffect} from "react";
import axios from "axios";
//import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Addpandamic.css';
import {Link} from 'react-router-dom';
import jspdf from 'jspdf'
import "jspdf-autotable"
 
import swal from 'sweetalert';
import ETute from "../../../BACKEND/models/Book";
export default function AllETutes(){

    const [,setETutes ] = useState([]);
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
            setETutes(res.data);
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
    const tableColumn = ["Book Type", "book Name", "type", "batchno", "quantity","publisherNo", ];
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
    doc.text("ONLINE ETUTOR", 70, 8).setFontSize(13);
    doc.text("Book Deatils Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Book Deatils Report.pdf");
};
    return (
        <>
     
   <div class="buttonn">
   <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(ETute)} >Book Deatils Report</button>
   <br></br>
  
   </div>
       <div class="lft">
<div class="card" >
<br></br>
   <br></br>
   <div class="head">
               
               <h3> Etute Deatils </h3>
               
               </div>
               
   <br></br>
   <br></br>
   
<input type="text" placeholder="Search.." className="form-control" style={{margintop:50,marginbottom:20,width:"50%"}}
      onChange = {(e) => {
          setsearchTerm(e.target.value);
      }}/>
   <br></br>
  
   <br></br>
   
   <button type="text" class="btnq btnq--skew btnq-default"> ETUTE Count : {ETute.length} </button>
   
   <table class="table table-bordered">
        <table class="table table-hover" >
            
                   <thead>
                       
                       <tr>
                       <th >Book Type</th>
                           <th>Book Name</th>
                           <th>type</th>
                           <th>batchno</th>
                           <th>quantity</th>
                           <th>publisherNO</th>
                          
                          

                       </tr>
                   </thead>
                   <tbody>
                   {
                           ETute.filter(val=>{
                               if(searchTerm === ''){
                                   return val;
                               }else if(
                                   val.booktype.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    
                                    

                               ){
                                   return val;
                               }
                               }).map(function (f) {
                               return <tr>
                                   
                                   <td >{f. booktype}</td>
                                   <td >{f. bookname} </td>
                                   <td >{f. type} </td>
                                   <td >{f. batchno} </td>
                                   <td >{f. quantity} </td>
                                   <td >{f. publisherNo} </td>
                                   
                                    

                                   

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