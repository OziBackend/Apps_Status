import React, { useState, useEffect } from 'react';
import {Route, Routes, useLocation} from 'react-router-dom'

import WindowsApp from '../serverCheck/WindowsApps';
import LinuxApp from '../serverCheck/LinuxApps';

import Sidebar from './Sidebar'; // Import Sidebar

function HomePage() {
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/windowsApps') || location.pathname.includes('/linuxApps')) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
    }, [location]);

    return (
        <div>
            <Sidebar /> {/* Add Sidebar component */}
            <Routes>
                <Route path='/windowsApps' element={<WindowsApp/>}/>
                <Route path='/linuxApps' element={<LinuxApp/>}/>
            </Routes>
            {showButtons && (
                <>
                    <h1>Welcome to the User Home Page</h1>
                    <p>This is the home page for authenticated users.</p>
                    <button onClick={() => window.location.href='/homepage/windowsApps'}>Windows Apps</button>
                    <button onClick={() => window.location.href='/homepage/linuxApps'}>Linux Apps</button>
                </>
            )}
        </div>
    );
}

export default HomePage;