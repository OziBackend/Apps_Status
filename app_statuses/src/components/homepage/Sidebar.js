import React, { useState, useEffect } from 'react';
import './Sidebar.css'
import { useNavigate, useLocation } from 'react-router-dom';

//windows app names
import appNames from '../datavalues/Windows/appnames';
import appNames2 from '../datavalues/Windows/appnames2';
import appNames3 from '../datavalues/Windows/appnames3';
//linux app names
import linuxAppNames from '../datavalues/Linux - Flask/linuxappnames';

function Sidebar({sidebarShow, handleLogout}) {
    const navigate = useNavigate();
    const location = useLocation();

    // Separate state for each dropdown
    const [selectedWindowsApp1, setSelectedWindowsApp1] = useState('');
    const [selectedWindowsApp2, setSelectedWindowsApp2] = useState('');
    const [selectedWindowsApp3, setSelectedWindowsApp3] = useState('');
    const [selectedLinuxApp, setSelectedLinuxApp] = useState('');

    // Added useEffect to reset dropdowns on route change
    useEffect(() => {
        // Reset all dropdowns
        setSelectedWindowsApp1('');
        setSelectedWindowsApp2('');
        setSelectedWindowsApp3('');
        setSelectedLinuxApp('');
    }, [location.pathname]); // Dependency on pathname

    const handleSelectWindowsApp1 = (event) => {
        setSelectedWindowsApp1(event.target.value);
        navigate(`/homepage/windows/${event.target.value}`);
    };

    const handleSelectWindowsApp2 = (event) => {
        setSelectedWindowsApp2(event.target.value);
        navigate(`/homepage/windows/${event.target.value}`);
    };

    const handleSelectWindowsApp3 = (event) => {
        setSelectedWindowsApp3(event.target.value);
        navigate(`/homepage/windows/${event.target.value}`);
    };

    const handleSelectLinuxApp = (event) => {
        setSelectedLinuxApp(event.target.value);
        navigate(`/homepage/linux/${event.target.value}`);
    };

    const Logout = () => {
        handleLogout();
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <>
            <div className="sidebar">
                <b>WINDOWS</b>
                <select value={selectedWindowsApp1} onChange={handleSelectWindowsApp1}>
                    <option value="" >161.97.164.28</option>
                    {appNames.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
                <select value={selectedWindowsApp2} onChange={handleSelectWindowsApp2}>
                    <option value="" >213.136.75.99</option>
                    {appNames2.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
                <select value={selectedWindowsApp3} onChange={handleSelectWindowsApp3}>
                    <option value="" >164.68.111.220</option>
                    {appNames3.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
                <br/>
                <b>LINUX</b>
                
                <select value={selectedLinuxApp} onChange={handleSelectLinuxApp}>
                    <option value="" >46.250.238.182</option>
                    {linuxAppNames.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
                <br/>
                <div className="logout-container">
                    <button className="logout-button" onClick={Logout}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;