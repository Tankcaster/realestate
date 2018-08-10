import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './CSS/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      minPrice: 0,
      maxPrice: 100000000000,
      sqft: 0,
      city: '',
      beds: 0,
      baths: 0,
    }
  }

  search = () => {
    this.props.history.push({
      pathname: '/map',
      state: this.state
    })
  }

  render() {
    return(
      <div className="home">
        <div className="searchBar">
          <h4>Search</h4>
          <div>
            <label for="city">City</label>
            <input name="city" type="text"
              onChange={(event) => {
                this.setState({city: event.target.value})
              }} />
          </div>
          <div>
            <label for="minPrice">Min $</label>
            <select value={this.state.minPrice}
              onChange={(event) => {
                this.setState({minPrice: event.target.value})
              }}>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
            </select>
          </div>
          <div>
            <label for="sqft">Sq Ft</label>
              <select value={this.state.sqft}
                onChange={(event) => {
                  this.setState({sqft: event.target.value})
                }}>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="1000">1000</option>
                <option value="1100">1100</option>
                <option value="1200">1200</option>
                <option value="1300">1300</option>
                <option value="1400">1400</option>
                <option value="1500">1500</option>
              </select>
          </div>
          <div>
            <label for="minPrice">Max $</label>
            <select value={this.state.maxPrice}
              onChange={(event) => {
                this.setState({maxPrice: event.target.value})
              }}>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
            </select>
          </div>
          <div>
            <label for="beds">bedrooms</label>
            <select value={this.state.minBeds}
              onChange={(event) => {
                this.setState({beds: event.target.value})
              }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label for="minPrice">bathrooms</label>
            <select value={this.state.baths}
              onChange={(event) => {
                this.setState({baths: event.target.value})
              }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button onClick={this.search}>
            Search our properties
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);
