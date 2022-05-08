import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Allfeedback.css';
import jspdf from 'jspdf'
import "jspdf-autotable"


import swal from 'sweetalert';
import { red } from "@material-ui/core/colors";

export default function Allfeedback() {
  const [searchTerm, setsearchTerm] = useState("");

  const [feedback, setfeedback] = useState([]);

  const deletefeedback = (id) => {
    axios.delete(`http://localhost:3001/feedback/deletefeed/${id}`).then(() => {
      swal({
        title: "Are you sure?",
        text: "The Item Will be Deleted from feedback List",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal("The Feedback has been deleted!",
              "success",
            ); setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            swal("File Is Not Deleted");
          }
        });
      ;
    })
  }



  useEffect(() => {
    //fetching all  data from the database
    function getfeedback() {
      axios.get("http://localhost:3001/feedback/allfeed").then((res) => {
        setfeedback(res.data);
        console.log(feedback);
      }
      ).catch((err) => {
        alert(err.message);
      })
    }
    getfeedback();
  }, [])
  //Genarating PDF
  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Student_Name", "Student_RegNo", "Subject", "Massage"];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
      const ticketData = [
        ticket.Student_Name,
        ticket.Student_RegNo,
        ticket.Subject,
        ticket.Massage,

      ];
      tableRows.push(ticketData);
    })
    doc.text("E-Tutor Online Service", 70, 8).setFontSize(13);
    doc.text("Feedback Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    //doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.save("Feedback Details Report.pdf");
  };

  return (
    <>
      <Header /><div class="head">
        <br></br>
        <br></br>

        <div class="mb-3">
          <h2> <center><b>Feedback Details Management</b></center></h2>
        </div>
      </div>

      <div class="buttonn">
        <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(feedback)} >GenerateReport</button>
      </div>



      <div class="lft">
        <br></br>
        <div class="wrap">
          <div class="card" >
            <div class="search">
              <input type="text" placeholder="Search.." className="form-control" style={{ margintop: 50, marginbottom: 20, width: "40%" }}
                onChange={(e) => {
                  setsearchTerm(e.target.value);
                }} />

            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <table class="table table-bordered">
            <table class="table table-striped table-hover">

              <thead class="table-dark">

                <tr>

                  <th >Student_Name</th>
                  <th>Student_RegNo</th>
                  <th>Subject</th>
                  <th>Massage</th>
                  <th>action</th>
                  <th></th>

                </tr>

              </thead>
              <tbody>
                {
                  feedback.filter(val => {
                    if (searchTerm === '') {
                      return val;
                    } else if (
                      val.Student_Name.toLowerCase().includes(searchTerm.toLowerCase())



                    ) {
                      return val;
                    }
                  }).map(function (f) {
                    return <tr>


                      {/* <td>{f._id}</td> */}
                      <td >{f.Student_Name}</td>
                      <td >{f.Student_RegNo} </td>
                      <td >{f.Subject} </td>
                      <td >{f.Massage} </td>


                      <td > <IconButton aria-label="delete" onClick={() => deletefeedback(f._id)}>


                        <DeleteIcon fontSize="small" />
                      </IconButton></td>

                      <td > <IconButton aria-label="delete"  href={`/edit/${f._id}`}>


                        <EditIcon fontSize="small" />
                      </IconButton></td>

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