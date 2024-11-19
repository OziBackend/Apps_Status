import React, { useState, useEffect } from 'react';
import {Route, Routes, useLocation} from 'react-router-dom'

import WindowsApp from '../serverCheck/WindowsApps';
import LinuxApp from '../serverCheck/LinuxApps';

function HomePage() {
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/windowsApps') || location.pathname.includes('/linuxApps') || location.pathname.includes('/windows') || location.pathname.includes('/linux')) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
    }, [location]);

    return (
        <div>
            <Routes>
                <Route path='/windowsApps' element={<WindowsApp/>}/>
                <Route path='/linuxApps' element={<LinuxApp/>}/>
            </Routes>
            {showButtons && (
                <>
                    <h1>Welcome to the User Home Page</h1>
                    <br/>
                    <button 
                        onClick={() => {window.location.href='/homepage/windowsApps'; }}>
                            Windows Apps
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button 
                        onClick={() => {
                            window.location.href='/homepage/linuxApps'; 
                            console.log('button click');
                            }}>
                            Linux Apps
                    </button>
                </>
            )}
        </div>
    );
}

export default HomePage;