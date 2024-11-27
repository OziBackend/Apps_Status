import React, { useState, useEffect} from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './windows.css'

import RomanticFrames from './RomanticFrames/RomanticFrames';

//app names
import appNames from '../../datavalues/Windows/appnames';
import appNames2 from '../../datavalues/Windows/appnames2';
import appNames3 from '../../datavalues/Windows/appnames3';

function Windows() {
    const navigate = useNavigate();
    const location = useLocation()

    // Separate state for each dropdown
    const [selectedWindowsApp1, setSelectedWindowsApp1] = useState('');
    const [selectedWindowsApp2, setSelectedWindowsApp2] = useState('');
    const [selectedWindowsApp3, setSelectedWindowsApp3] = useState('');

    // Added state to control dropdown visibility
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Updated useEffect to hide dropdown on route change
    useEffect(() => {
        // Reset all dropdowns and hide dropdown
        setSelectedWindowsApp1('');
        setSelectedWindowsApp2('');
        setSelectedWindowsApp3('');
        setIsDropdownVisible(location.pathname === '/homepage/windows');
    }, [window.location.pathname]); // Dependency on pathname

    const handleSelectWindowsApp1 = (event) => {
        setSelectedWindowsApp1(event.target.value);
        console.log(isDropdownVisible);
        setIsDropdownVisible(false)
        console.log(isDropdownVisible);
        navigate(`/homepage/windows/${event.target.value}`);
    };

    const handleSelectWindowsApp2 = (event) => {
        setSelectedWindowsApp2(event.target.value);
        setIsDropdownVisible(false)
        navigate(`/homepage/windows/${event.target.value}`);
    };

    const handleSelectWindowsApp3 = (event) => {
        setSelectedWindowsApp3(event.target.value);
        setIsDropdownVisible(false)
        navigate(`/homepage/windows/${event.target.value}`);
    };

    return (
        <div>
            <Routes>
                <Route path="/Romantic Love Frames/*" element={<RomanticFrames/>} />
            </Routes>
            {isDropdownVisible && ( // Conditional rendering of the dropdown
                <div>
                    <b>WINDOWS</b><br/>
                    <select className="dropdown" value={selectedWindowsApp1} onChange={handleSelectWindowsApp1}>
                        <option value="">161.97.164.28</option>
                        {appNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <select className="dropdown" value={selectedWindowsApp2} onChange={handleSelectWindowsApp2}>
                        <option value="" >213.136.75.99</option>
                        {appNames2.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <select className="dropdown" value={selectedWindowsApp3} onChange={handleSelectWindowsApp3}>
                        <option value="" >164.68.111.220</option>
                        {appNames3.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default Windows;
