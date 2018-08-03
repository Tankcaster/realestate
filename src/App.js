import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Map from './Components/Map';
import './Components/CSS/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Route path="/map" component={Map} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
