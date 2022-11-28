import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setIsLoggedIn(true);
  },[])

  const handleLogin = () => {
    navigate('/login');
  }

  const handleSignup = () => {
    navigate('/signup');
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (isLoggedIn) {
    return (
      <div className="nav-container">
        <div className="nav-logo">
          Social Network
        </div>
        <div className="nav-buttons">
          <button className='btn' onClick={handleLogout}>Log out</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="nav-container">
        <div className="nav-logo">
          Social Network
        </div>
        <div className="nav-buttons">
          <button className='btn' onClick={handleLogin}>Login</button>
          <button className='btn' onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    )
  }
}

export default Nav