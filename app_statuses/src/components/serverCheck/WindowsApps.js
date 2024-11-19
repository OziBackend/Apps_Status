import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import AppList from '../modules/AppList';

// for server 161.97.164.28
import appNames from '../datavalues/Windows/appnames';
import appAPIs from '../datavalues/Windows/appapis';
// for server 213.136.75.99
import appNames2 from '../datavalues/Windows/appnames2';
import appAPIs2 from '../datavalues/Windows/appapis2';
// for server 164.68.111.220
import appNames3 from '../datavalues/Windows/appnames3';
import appAPIs3 from '../datavalues/Windows/appapis3';

const WindowsApp = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ position: 'absolute', top: '0', left: '0' }}>Back</button>
                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ position: 'absolute', top: '0', right: '0' }}>Refresh</button>
            </div>
            <br/>
            <h1>Windows VM Apps</h1>
            <div className="row">
                <div className="col-md-6">
                    <AppList
                    ip={'161.97.164.28'}
                    appnames={appNames}
                    appapis={appAPIs}
                    />
                </div>
                <div className="col-md-6">
                    <AppList
                    ip={'213.136.75.99'}
                    appnames={appNames2}
                    appapis={appAPIs2}
                    />
                    <br/>
                    <AppList
                    ip={'164.68.111.220'}
                    appnames={appNames3}
                    appapis={appAPIs3}
                    />
                </div>
            </div>
        </div>
    );
};

export default WindowsApp;
