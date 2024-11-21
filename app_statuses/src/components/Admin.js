import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Admin.css'; // Importing a CSS file for styles

const Admin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example authorization check
    if (username === 'ozibackend' && password === 'OziBackend12') { // Replace with actual logic
      const userData = { username }; // Example user data
      onLogin(userData); // Call the onLogin function passed from App
      navigate('/homepage'); // Navigate to /homepage on successful login
    } else {
      setError('Unauthorized access'); // Set error message
    }
  };

  return (
    <div className="admin-container"> {/* Added a container for styling */}
      <form onSubmit={handleSubmit} className="admin-form"> {/* Added class for styling */}
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;