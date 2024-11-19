import React from 'react';
import { useNavigate  } from 'react-router-dom';
import '../../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import AppList from '../modules/AppList';

// for server 46.250.238.182
import linuxAppNames from '../datavalues/Linux/linuxappnames';
import linuxAppAPIs from '../datavalues/Linux/linuxappapis';

const LinuxApp = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ position: 'absolute', top: '0', left: '0' }}>Back</button>
                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ position: 'absolute', top: '0', right: '0' }}>Refresh</button>
            </div>
            <br/>
            <h1>Linux VM Apps</h1>
            <div className="row">
                <div className="col-md-12">
                    <AppList
                    ip={'46.250.238.182'}
                    appnames={linuxAppNames}
                    appapis={linuxAppAPIs}
                    />
                </div>
            </div>
        </div>
    );
};

export default LinuxApp;
