import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Nav.css';

function Nav() {
  return (
    <div className="navbar">
      <Link to="/">Mountain Creek Real Estate Co</Link>
      <nav>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Etc</a>
      </nav>
    </div>
  )
}

export default Nav;
