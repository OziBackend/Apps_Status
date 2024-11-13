import './App.css';
import './bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import WindowsApp from './components/WindowsApps';
import LinuxApp from './components/LinuxApps';


function App() {
  // Define the arrays
 
  return (
    <div className="App">
      <header className="App-header">
        <WindowsApp/>
        <LinuxApp/>
      </header>
    </div>
  );
}

export default App;
