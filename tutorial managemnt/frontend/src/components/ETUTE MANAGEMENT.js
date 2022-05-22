//import React,{useState,useEffect} from "react";

import swal from 'sweetalert';
import './pandemic.css';
import React, { Component } from 'react';
import axios from 'axios';
 

export default class EditETute extends Component {
    constructor(props) {
        super(props);

        this.onChangebooktype = this.onChangebooktype.bind(this);
        this.onChangebookname = this.onChangebookname.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
        this.onChangebatchno = this.onChangebatchno.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangepublisherNo = this.onChangepublisherNo.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            booktype: '',
            name: '',
            type: '',
            batchno: '',
            quantity: '',
            publisherNo: '',
            
            ETute: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/ETutor/' + this.props.match.params.id)
            .then(res => {

                console.log(this.props.match.params.id)
                this.setState({
                    booktype: res.data.booktype,
                    bookname: res.data.bookname,
                    type: res.data.type,
                    batchno: res.data.batchno,
                    quantity: res.data.quantity,
                    publisherNo: res.data.publisherNo,
                    

                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:3000/ETutor/all')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        ETute: response.data.map(ETute => ETute.booktype),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangebooktype(e) {
        this.setState({
            booktype: e.target.value
        })
    }

    onChangebookname(e) {
        this.setState({
            bookname: e.target.value
        })
    }

    onChangetype(e) {
        this.setState({
            type: e.target.value
        })
    }
    
    onChangebatchno(e) {
        this.setState({
            batchno: e.target.value
        })
    }
    
    onChangequantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }
    
    onChangepublisherNo(e) {
        this.setState({
            publisherNo: e.target.value
        })
    }

   

   


    onSubmit(e) {
        e.preventDefault();

        const ETute = {
         
            booktype: this.state.booktype,
            bookname: this.state.bookname,
            type: this.state.type,
            batchno: this.state.batchno,
            quantity: this.state.quantity,
            publisherNo: this.state.publisherNo,
            

        }

        console.log( ETute);

        axios.post('http://localhost:3000/ETutor/update/' + this.props.match.params.id, ETute)
            .then(res => console.log(res.data));
        alert("Edit Successfully")
        window.location = '/all';
    }

    
    render() {
        return (<div className = "container" >
            <h3><center> Update Book Details</center> </h3> 
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit = { this.onSubmit }>

            <div class="mb-3">
            <label > Book Type: </label> 
             <input type = "text" required className = "form-control" value = { this.state.booktype } onChange = { this.onChangebooktype }/>
              </div> 


              <div class="mb-3">
            <label> Book Name: </label>
             <input type = "text"required className = "form-control"value = { this.state.Bookname } onChange = { this.onChangebookname}/> 
             </div> 


             <div class="mb-3">
            <label> Type: </label> 
            <input type = "text"className = "form-control "value = { this.state.type }onChange = { this.onChangetype }/> 
            </div>


            <div class="mb-3">
            <label> batchno: </label> 
            <input type = "text"className = "form-control "value = { this.state.batchno }onChange = { this.onChangebatchno}/> 
            </div>

            <div class="mb-3">
            <label > quantity: </label>
             <input type = "text"className = "form-control"value = { this.state.quantity }onChange = { this.onChangequantity }/>
              </div>


              
            <div class="mb-3">
            <label > publisherNO: </label>
             <input type = "text"className = "form-control"value = { this.state.publisherNo }onChange = { this.onChangepublisherNo }/>
              </div>
              



            <br>


            </br> 



            


            <div className = "form-group">
            <input type = "submit"value = "Create"className = "btn btn-primary"/>
            </div> 
            </form > 
            </div>

        
)
}
}