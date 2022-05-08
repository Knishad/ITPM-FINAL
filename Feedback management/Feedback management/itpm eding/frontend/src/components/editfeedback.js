//import React,{useState,useEffect} from "react";

import swal from 'sweetalert';
import './feedback.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Editfeedabck = props => {

    const [state, setState] = useState({
        Student_Name: '',
        Student_RegNo: '',
        Subject: '',
        Massage: ''
    })

    const { Student_Name, Student_RegNo, Subject, Massage } = state;

    const componentDidMount = () => {
        console.log("Came 1");
        axios.get(`http://localhost:3001/feedback/getfeed/${props.match.params.id}`)
            .then(res => {
                console.log("Came 2");
                console.log(props.match.params.id)
                console.log(res.data.feedback);
                setState({
                    Student_Name: res.data.feedback.Student_Name,
                    Student_RegNo: res.data.feedback.Student_RegNo,
                    Subject: res.data.feedback.Subject,
                    Massage: res.data.feedback.Massage,
                })
                console.log(state);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function handleChange(name) {
        return function (event) {
            setState({ ...state, [name]: event.target.value });
        }
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    const handleSubmit = event => {
        event.preventDefault()
        axios
            .put(`http://localhost:3001/feedback/updatefeed/${props.match.params.id}`, { Student_Name, Student_RegNo, Subject, Massage })
            .then(response => {

                console.log(response.data)
                const { Student_Name, Student_RegNo, Subject, Massage } = response.data

                //empty state
                setState({ ...state, Student_Name, Student_RegNo, Subject, Massage });
                //show success alert
                alert(`Details Updated`);
            })
            .catch(error => {
                console.log(error.Response)
                alert(error.response.data.error)
            })
    };

    return (<div className="container" >
        <h3><center> EDIT Feedback</center> </h3>
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label > Student_Name: </label>
                <input onChange={handleChange('Student_Name')} value={Student_Name} type="text" className="form-control" placeholder="Student Name" required />
            </div>
            <div class="mb-3">
                <label> Student_RegNo: </label>
                <input onChange={handleChange('Student_RegNo')} value={Student_RegNo} type="text" className="form-control" placeholder="Student Registration Number" required />
            </div>
            <div class="mb-3">
                <label> Subject: </label>
                <input onChange={handleChange('Subject')} value={Subject} type="text" className="form-control" placeholder="Student Subject" required />
            </div>

            <div class="mb-3">
                <label > Massage: </label>
                <input onChange={handleChange('Massage')} value={Massage} type="text" className="form-control" placeholder="Student Message" required />
            </div>

            <br>

            </br>

            <div className="form-group">
                <input type="submit" value="Update" className="btn btn-primary" />
            </div>
        </form >
    </div>


    )
}

export default Editfeedabck;