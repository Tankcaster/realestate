import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/page404.css';

const page404 = () => {
  return (
    <div className="page404">
      <img src="404.png"/>
      <p>Seems we can't find that page</p>
      <Link to="/">Go Back</Link>
      <p>or if you don't think this was supposed to happen</p>
      <a href="#">report a bug</a>
    </div>
  )
}

export default page404;
