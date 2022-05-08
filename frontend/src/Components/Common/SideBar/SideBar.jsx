import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { FiHome, FiBook, FiFileText, FiTrello } from "react-icons/fi";
import { FaUserCircle } from 'react-icons/fa';

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.css";

const SideBar = () => {
    const [strUseApp, setUseApp] = useState("Home");

    return (
        <>
            <div id="header">
                <ProSidebar collapsed={false}>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={strUseApp === "Dashboard" ? true : false} icon={<FiHome />} onClick={() => setUseApp("Dashboard")}>
                                Dashboard
                                <Link to="/" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "studentDetails" ? true : false} icon={<FiTrello />} onClick={() => setUseApp("studentDetails")}>
                                Student Details
                                <Link to="/studentDetails" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "studentList" ? true : false} icon={<FiTrello />} onClick={() => setUseApp("studentList")}>
                                Student List
                                <Link to="/studentList" />
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
            </div>
        </>
    );
};

export default SideBar;