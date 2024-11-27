import React, { useState, useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'

import WindowsApp from '../serverCheck/WindowsApps';
import LinuxApp from '../serverCheck/LinuxApps';

import Windows from '../apps/windows/windows';

// Function to call the API
async function callModelsLabAPI() {
    try {
        const response = await fetch('https://modelslab.com/api/v1/enterprise/image_editing/removebg_mask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: 'zeaaqvab605v9g',
                image: 'https://bodyshapeeditor.s3.us-east-1.amazonaws.com/Images/temp.png'
            }), // Replace with your actual key-value pair
        });
        return response.status;
    } catch (error) {
        console.error('Error calling ModelsLab API:', error);
        return null; // Return null on error
    }
}

function HomePage() {
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        if (location.pathname.includes('/windowsApps') || location.pathname.includes('/linuxApps') || location.pathname.includes('/windows') || location.pathname.includes('/linux')) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
    }, [location]);

    return (
        <div style={{width:'100%', padding:'20px'}}>
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
                    <div>
                        <h1>Server</h1>
                        <button 
                            onClick={() => {window.location.href='/homepage/windows'; }}
                            className="btn btn-success"
                        >
                                Windows
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button 
                            onClick={() => {
                                window.location.href='/homepage/linux'; 
                                console.log('button click');
                                }}
                                className="btn btn-success"
                        >
                                Linux
                        </button>
                        <br/><br/>
                        <h1>Server Check Pages</h1>
                        <button 
                            onClick={() => {window.location.href='/homepage/windowsApps'; }}
                            className="btn btn-default"
                        >
                                Windows Apps
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button 
                            onClick={() => {
                                window.location.href='/homepage/linuxApps'; 
                                console.log('button click');
                                }}
                            className="btn btn-default"
                        >
                                Linux Apps
                        </button>
                        <br/><br/>
                    </div>
                    <div>
                        <h1>ModelsLab Server Check</h1>
                        <button 
                            onClick={async () => {
                                const status = await callModelsLabAPI();
                                if (status === 200) {
                                    setIcon('✔️');
                                } else {
                                    setIcon('❌');
                                }
                            }}
                            className="btn btn-primary"
                        >
                            ModelsLab Server
                        </button>
                        {icon && <span style={{ marginLeft: '10px' }}>{icon}</span>}
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;