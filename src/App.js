import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Map from './Components/Map';
import Home from './Components/Home';
import HouseForm from './Components/HouseForm';
import House from './Components/House';
import page404 from './Components/404.js';
import './Components/CSS/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Home} />
            <Route path="/map" component={Map} />
            <Route path="/houseform" component={HouseForm} />
            <Route path="/houses/:id" component={House} />
            <Route path="/404" component={page404} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
