import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
import './pandemic.css';
 

export default function Addbook(){
    const [Booktype, SetBooktype] = useState("");
    const [name, Setname] = useState("");
    const [type, Settype] = useState("");
    const [batchno, Setbatchno] = useState("");
    const [quantity, Setquantity] = useState("");
    const [publisherNO, SetpublisherNO] = useState("");
    

    function sendData(e){
      swal({
        title: "Scuccess!",
        text:"Book Details Sccessfully Added",
        icon:"success",
        button:"OK",

      });
        e.preventDefault()

        const newBook = {
          Booktype,
          name,
          type,
          batchno,
          quantity,
          publisherNO,
          
        }
        
        axios.post("http://localhost:3000/ETutor/add", newBook).then(()=>{
          
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        
       
        <div className = "container">
          
            <h1><center> Create Book Details</center></h1>
          <br></br>
          <br></br>
            <form onSubmit={sendData}>
  <div class="mb-3">
    <label for=" Booktype" class="form-label"> Book Type</label>
    <input type="string"   class="form-control" id=" Booktype" onChange ={(e)=>{

        SetBooktype(e.target.value);
    }} ></input>
   
  </div>
  <div class="mb-3">
    <label for="bookname" class="form-label">Book Name</label>
    <input type="string"  class="form-control" id="Bookname" onChange ={(e)=>{

    Setname(e.target.value);
}}></input>
  </div>
  
  <div class="mb-3">
    <label for="type" class="form-label">Type</label>
    <input type="string"  class="form-control" id=" type" onChange ={(e)=>{

Settype(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="batchno" class="form-label">Batch No</label>
    <input type="string"  class="form-control" id="batchno" onChange ={(e)=>{

Setbatchno(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="quantity" class="form-label">quantity</label>
    <input type="string"  class="form-control" id="quantity" onChange ={(e)=>{

Setquantity(e.target.value);
}}></input>
  </div>

  <div class="mb-3">
    <label for="publisherNo" class="form-label">Publisher No</label>
    <input type="string"  class="form-control" id="publisherNo" onChange ={(e)=>{

Setp(e.target.value);
}}></input>
  </div>

 
  

  <button type="submit" class="btn btn-primary">Add Book Details  </button>
</form>
     
        </div>

        
    )
}