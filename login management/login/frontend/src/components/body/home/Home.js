import React from 'react'
import './home.css'
import AppointmentCard from './AppointmentCard';

import img1 from '../../../assets/p1.jpeg';
import img2 from '../../../assets/p2.jpeg';
import img3 from '../../../assets/p3.jpeg';
import img4 from '../../../assets/p4.jpeg'


function Home() {
    return (
        <div className="home_page">
            <h2>E TUTORIAL MANAGEMENT</h2>
            
            
            <div class="row">
            
           
            
            <div className='card'>
                
            <AppointmentCard imgURL={img1} title='Best experienced teachers ' text={"We want you to succeed"} URLpath={"/addOrder"}/>
            </div>

    
            <div className='card'>
            <AppointmentCard imgURL={img2} title='Paper marking panel' text={"Pass your exam first try!"}  />
            </div>
            
           
            <div className='card'>
            <AppointmentCard imgURL={img3} title='Advanced tutorials' text={"Get the best for less!"} />
            </div>

            <div className='card'> 
            <AppointmentCard imgURL={img4} title='Feedback' text={"Get the best for less!"} />
            </div>

            </div>
            </div>
            
            
            
            
           
         
          
       
    )
}

export default Home
