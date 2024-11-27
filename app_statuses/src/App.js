import './App.css';
import './bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'; // Import Router components
import { useState, useEffect } from 'react'; // Import useState

//Admin and Home Page
import Admin from './components/Admin';
import HomePage from './components/homepage/HomePage';

import Navbar from './components/homepage/Navbar'
import Sidebar from './components/homepage/Sidebar';


// Mock function to check if user is logged in
const isLoggedIn = () => {
  return !!localStorage.getItem('user'); // Example: check for a user in localStorage
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/" />; // Redirect to Admin if not logged in
};

function App() {
  const location = useLocation(); // Get the current location
  const [showSideBar, setShowSideBar] = useState(false);
  
  const showHideSideBar = (status) => {
    setShowSideBar(status);
  };

  const handleLogin = (userData) => {
    showHideSideBar(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    console.log("Logged out");
  };

  // Check if the current route is not '/homepage' to hide the sidebar
  useEffect(() => {
    if (location.pathname !== '/') {
      showHideSideBar(true);
    }else{
      handleLogout()
    }
  }, [location.pathname]); // Run effect when the pathname changes

  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={
              <div className='Adminpage'>
                <Admin onLogin={handleLogin} />
              </div>
            } />

            <Route path="/homepage/*" element={<PrivateRoute element={
              <>
                {showSideBar && 
                <Sidebar 
                sidebarShow={setShowSideBar} handleLogout={handleLogout}/>}
                <div className="App">
                  <header className="App-header">
                    <HomePage />
                    
                  </header>
                </div>
              </>
            } />} />
      </Routes>
    </>
  );
}


export default App;
