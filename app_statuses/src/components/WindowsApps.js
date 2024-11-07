import React from 'react';
import '../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import AppList from './modules/AppList';

// for server 161.97.164.28
import appNames from './datavalues/appnames';
import appAPIs from './datavalues/appapis';
// for server 213.136.75.99
import appNames2 from './datavalues/appnames2';
import appAPIs2 from './datavalues/appapis2';
// for server 164.68.111.220
import appNames3 from './datavalues/appnames3';
import appAPIs3 from './datavalues/appapis3';

const WindowsApp = () => {
    return (
        <div>
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
