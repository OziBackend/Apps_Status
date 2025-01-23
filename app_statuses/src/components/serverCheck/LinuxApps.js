import React from 'react';
import '../../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import AppList from '../modules/AppList';

// for server 46.250.238.182
import linuxFlaskAppNames from '../datavalues/Linux - Flask/linuxappnames';
import linuxFlaskAppAPIs from '../datavalues/Linux - Flask/linuxappapis';

import linuxFastAppNames from '../datavalues/Linux - Fast/linuxfastnames';
import linuxFastAppAPIs from '../datavalues/Linux - Fast/linuxfastapis';

const LinuxApp = () => {
    return (
        <div>
            <br/>
            <h1>Linux VM Apps</h1>
            <div className="row">
                <div className="col-md-6">
                    <AppList
                    ip={'46.250.238.182 - FLASK APIs'}
                    appnames={linuxFlaskAppNames}
                    appapis={linuxFlaskAppAPIs}
                    />
                </div>
                <div className="col-md-6">
                    <AppList
                    ip={'46.250.238.182 - FAST APIs'}
                    appnames={linuxFastAppNames}
                    appapis={linuxFastAppAPIs}
                    />
                </div>
            </div>
        </div>
    );
};

export default LinuxApp;
