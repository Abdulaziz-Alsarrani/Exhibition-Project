import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './navStyle.css'; // Import CSS for styling
import { useAuth  } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

   const handleLogout = () => {
    logout(); 
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <a className='link' onClick={handleLogout}>Logout</a>
            
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
