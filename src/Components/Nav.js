import React from 'react';
import { Link } from 'react-router';
import './CSS/Nav.css';

function Nav() {
  return (
    <div className="navbar">
      <h2>Mountain Creek Real Estate Co</h2>
      <nav>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Etc</a>
      </nav>
    </div>
  )
}

export default Nav;
