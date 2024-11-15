import './App.css';
import './bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Route, Routes } from 'react-router-dom'; // Import Router components

//Admin and Home Page
import Admin from './components/Admin';
import HomePage from './components/homepage/HomePage';

import Navbar from './components/homepage/Navbar'

function App() {
  // Define the arrays
 
  return (
    <>
      <Routes>
        <Route path="/homepage/*" element={<Navbar/>} />
      </Routes>
      <div className="App">
        <header className="App-header">
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<Admin />} />
            <Route path="/homepage/*" element={<HomePage />} />
            
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
