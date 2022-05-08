import React from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

export const  HeaderData =  [ 
    
    {
        // link represents where it should redirect to
        title: "Teacher Deatails",
        icon:<AccountCircleSharpIcon/>,
        link:"/"

    },
    {
        title: "Add Teacher Details ",
        icon:<InsertChartIcon/>,
        link: "/",

    },
    {
        // link represents where it should redirect to
        title: "Student Details",
        icon:<AccountCircleSharpIcon/>,
        link:"/add"

    },
    {
        title: "Add Student Deatils",
        icon:<EmojiPeopleIcon/>,
        link:"/"

    },
    {
        // link represents where it should redirect to
        title: "Add Tutorial ",
        icon:<AccountCircleSharpIcon/>,
        link:"/add"

    },
    {
        title: "Tutorial  Management",
        icon:<TrendingUpIcon/>,
        link:"/"

    },
    
    {
        // link represents where it should redirect to
        title: "Add Feedback Details",
        icon:<AccountCircleSharpIcon/>,
        link:"/addfeed"

    },
    {
        title: "Feedback Details Management",
        icon:<ShoppingCartIcon/>,
        link:"/allfeed"

    },




];


  