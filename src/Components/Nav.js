import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Nav.css';

class Nav extends React.Component {

  menuToggle = () => {
    let linksEl = document.querySelector('.links');
    if (linksEl.style.display === 'grid') {
        linksEl.style.display = 'none';
    }
    else {
        linksEl.style.display = 'grid';
    }
  }

  render() {
    return (
      <nav>
        <Link className="brand" to="/"><h1>Mountain Creek</h1></Link>
        <i onClick={this.menuToggle} className="fas fa-bars toggler" />
        <div className="links">
          <Link to="/map">Houses</Link>
          <Link to="/land">Land</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    )
  }
}

export default Nav;
