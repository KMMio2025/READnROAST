import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-brand">
        <img src="/images/logo.png" alt="Logo" className="appLogo" />
      </div>
      
      <div className="nav-left">

        <a href="#" className="nav-link">Home</a>
        <i className='bx bxs-coffee-bean bean'></i>
        <a href="#" className="nav-link">About</a>
        <i className='bx bxs-coffee-bean bean'></i>
        <a href="#" className="nav-link">Services</a>
        <i className='bx bxs-coffee-bean bean'></i>
        <a href="#" className="nav-link">Contact</a>
      </div>
      <div class="search-bar"> 
        <input type="text" placeholder="Search.." />
        <i class='bx bx-search' ></i>
      </div>
      <div className="nav-right">
        <a href="#" className="nav-link login-btn">Login</a>
      </div>
    </div>
  );
};

export default Navbar;