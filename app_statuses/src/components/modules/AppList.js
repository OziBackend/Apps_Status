import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const AppList = ({ ip, appnames, appapis }) => {
  const [appList, setAppList] = useState({});

  useEffect(() => {
    const fetchAppStatuses = async () => {
      appapis.forEach(async (api, index) => {
        let response;
        try {
          response = await fetch(api);
        } catch (error) {
          console.error(`Error fetching ${api}: ${error.message}`);
          setAppList(prevState => ({ ...prevState, [appnames[index]]: { name: appnames[index], status: 'timeout', data: null } }));
          return;
        }
        let data = null;
        if (response.ok) {
          data = await response.json();
        }
        setAppList(prevState => ({ ...prevState, [appnames[index]]: { name: appnames[index], status: response.status, data: data } }));
      });
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
            <th style={{border: '1px solid gray', width: '100px'}}><i>Details</i></th>
        </tr>
        {Object.keys(appList).map(key => (
          <tr key={key}>
            <td style={{border: '1px solid gray', fontSize: '20px'}}>{appList[key].name}</td>
            <td style={{border: '1px solid gray'}}>{appList[key].status === 200 ? <span style={{color: 'green'}}>&#x2714;</span> : appList[key].status === 'timeout' || appList[key].status === 400 || appList[key].status === 404 ? <span style={{color: 'red'}}>&#x2718;</span> : <span style={{color: 'red'}}>&#x2718;</span>}</td>
            <td style={{border: '1px solid gray'}}>
                <Link 
                to={`/${appList[key].name}`}
                >
                    <FontAwesomeIcon icon={faInfoCircle} />
                </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AppList;
