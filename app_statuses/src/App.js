import logo from './logo.svg';
import './App.css';

import AppList from './components/modules/AppList';

// for server 161.97.164.28
import appNames from './components/datavalues/appnames';
import appAPIs from './components/datavalues/appapis';
// for server 213.136.75.99
import appNames2 from './components/datavalues/appnames2';
import appAPIs2 from './components/datavalues/appapis2'
// for server 164.68.111.220

function App() {
  // Define the arrays
 
  return (
    <div className="App">
      <header className="App-header">
         <AppList
          ip = {'161.97.164.28'}
          appnames = {appNames}
          appapis = {appAPIs}
         />
         <br/>
         <AppList
          ip = {'213.136.75.99'}
          appnames = {appNames2}
          appapis = {appAPIs2}
         />
      </header>
    </div>
  );
}

export default App;
