import React from "react";
import './styles.css';
import {Link} from 'react-router-dom'

function Header() {

  const navstyle = {
    color:"white",
  };

  return (
      <nav className="navv">
        <h1>PoojaPath</h1>
        <ul className='navv-links'>
          <Link style={navstyle} to="/"><li><h6>Home</h6></li></Link>
          <Link style={navstyle} to="/create"><li><h6>Add</h6></li></Link>
          <Link style={navstyle} to="/about"><li><h6>About</h6></li></Link> 
          <Link style={navstyle} to="/contact"><li><h6>Contact</h6></li></Link>
        </ul>
      </nav>
  );
}

export default Header;
