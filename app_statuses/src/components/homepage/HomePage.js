import React, { useState, useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'

import WindowsApp from '../serverCheck/WindowsApps';
import LinuxApp from '../serverCheck/LinuxApps';

import Windows from '../apps/windows/windows';

function HomePage() {
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.includes('/windowsApps') || location.pathname.includes('/linuxApps') || location.pathname.includes('/windows') || location.pathname.includes('/linux')) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
    }, [location]);

    return (
        <div>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ position: 'absolute', top: '0', left: '0' }}>Back</button>
                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ position: 'absolute', top: '0', right: '0' }}>Refresh</button>
            </div>
            <br/>
            <Routes>
                {/* Apps Routes */}
                <Route path='/windows/*' element={<Windows/>}/>
                <Route path='/linux/*' element={2}/>
                {/* Server checking routes */}
                <Route path='/windowsApps' element={<WindowsApp/>}/>
                <Route path='/linuxApps' element={<LinuxApp/>}/>
            </Routes>
            {showButtons && (
                <>
                    <h1>Server</h1>
                    <button 
                        onClick={() => {window.location.href='/homepage/windows'; }}>
                            Windows
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button 
                        onClick={() => {
                            window.location.href='/homepage/linux'; 
                            console.log('button click');
                            }}>
                            Linux
                    </button>
                    <br/><br/><br/>
                    <h1>Server Check</h1>
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