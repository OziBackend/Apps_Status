import './App.css';
import './bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Route, Routes } from 'react-router-dom'; // Import Router components
import { useState } from 'react'; // Import useState

//Admin and Home Page
import Admin from './components/Admin';
import HomePage from './components/homepage/HomePage';

import Navbar from './components/homepage/Navbar'
import Sidebar from './components/homepage/Sidebar';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    console.log('check: ', isSidebarVisible);
    setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  return (
    <>
      <Routes>
        <Route path="/homepage/*" element={<><Navbar/></>} />
      </Routes>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/homepage/*" element={<><Sidebar/><HomePage/></>} />
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
