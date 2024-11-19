import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'ozibackend' && password === 'OziBackend@12') {
            navigate('/homepage');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="admin-input"
                />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="admin-input"
                autoComplete='OziBackend@12'
            />
            <button type="submit" className="admin-button">Login</button>
        </form>
    );
}

export default Admin;
