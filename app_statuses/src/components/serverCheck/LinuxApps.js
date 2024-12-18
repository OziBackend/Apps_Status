import React from 'react';
import '../../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import AppList from '../modules/AppList';

// for server 46.250.238.182
import linuxAppNames from '../datavalues/Linux/linuxappnames';
import linuxAppAPIs from '../datavalues/Linux/linuxappapis';

const LinuxApp = () => {
    return (
        <div>
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
