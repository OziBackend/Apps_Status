import React, { useEffect, useState } from 'react';

const AppList = ({ ip, appnames, appapis }) => {
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    const fetchAppStatuses = async () => {
      const apps = await Promise.all(appapis.map(async (api, index) => {
        let response;
        try {
          response = await fetch(api);
        } catch (error) {
          console.error(`Error fetching ${api}: ${error.message}`);
          return {
            name: appnames[index],
            status: 'timeout', // Indicate timeout error
            data: null,
          };
        }
        let data = null;
        if (response.ok) {
          data = await response.json();
        }
        return {
          name: appnames[index],
          status: response.status,
          data: data,
        };
      }));
      setAppList(apps);
    };

    fetchAppStatuses();
  }, [appnames, appapis]);

  return (
    <div>
        <div><b>VM</b>= {ip}</div>
      <table style={{borderCollapse: 'collapse'}}>
        <tr>
            <th style={{border: '1px solid gray', width: '400px'}}><i>AppName</i></th>
            <th style={{border: '1px solid gray', width: '100px'}}><i>Status</i></th>
        </tr>
        {appList.map(app => (
          <tr key={app.name}>
            <td style={{border: '1px solid gray', fontSize: '20px'}}>{app.name}</td>
            <td style={{border: '1px solid gray'}}>{app.status === 200 ? <span style={{color: 'green'}}>&#x2714;</span> : app.status === 'timeout' || app.status === 400 || app.status === 404 ? <span style={{color: 'red'}}>&#x2718;</span> : <span style={{color: 'red'}}>&#x2718;</span>}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AppList;
