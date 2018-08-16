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

  makeOptionList = (min, max, changeAmount, prefix, suffix) => {
    let output = [];
    for(let i = min; i <= max; i += changeAmount) {
      output.push(<option value={i}>{prefix + i + suffix}</option>)
    }
    return output;
  }

  render() {
    return(
      <div className="home">
        <div className="jumbotron">
            <div className="jumboTitle">
              <h2>Serving Huntsville and Northern Arkansas</h2>
            </div>
            <div className="searchBar">
              <div>
                <label for="city"><i className="fas fa-search" /></label>
                <input value={this.state.city} className="city" type="text" placeholder="city"
                  onChange={(event) => {
                    this.setState({city: event.target.value})
                  }} />
              </div>
              <div>
                <label><i className="fas fa-ruler-combined"/></label>
                  <select value={this.state.sqft}
                    onChange={(event) => {
                      this.setState({sqft: event.target.value})
                    }}>
                    {this.makeOptionList(100, 4000, 100, '', ' sqft')}
                  </select>
              </div>
              <div className="priceSelector">
                <label><i className="fas fa-tag" /></label>
                <select>
                  <option>$0 - $50,000</option>
                  <option>$50,000 - $100,000</option>
                  <option>$100,000 - $150,000</option>
                  <option>$150,000 - $200,000</option>
                  <option>$200,000 - $250,000</option>
                  <option>$250,000 - $300,000</option>
                  <option>$300,000 - $350,000</option>
                  <option>$350,000 - $400,000</option>
                  <option>$400,000 - $450,000</option>
                  <option>$450,000 - $500,000</option>
                  <option>$500,000 - $550,000</option>
                  <option>$550,000 - $600,000</option>
                  <option>$600,000 - $650,000</option>
                  <option>$650,000 - $700,000</option>
                  <option>$700,000 - $750,000</option>
                  <option>$750,000 - $800,000</option>
                  <option>$800,000 - $850,000</option>
                  <option>$850,000 - $900,000</option>
                  <option>$900,000 - $950,000</option>
                  <option>$850,000 - $1,000,000</option>
                  <option>$1,000,000 +</option>
                </select>
              </div>
              <div>
                <label for="beds"><i className="fas fa-bed"/></label>
                <select value={this.state.beds}
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
                <label><i className="fas fa-bath"/></label>
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
              <div className="searchButton">
                <button onClick={this.search}>Search our properties</button>
              </div>
            </div>
        </div>

        <div className="featured">
          <div className="featuredTitle">
            <h2>Feauted properties</h2>
          </div>
          <div id="featuredCard">
            <div  className="card" id={1}>
                <img src={'/images/house2.jpg'} />
                <h4>12345 Somewhere Blvd, Nowhere, NA 54321</h4>
                <div>
                <p><i className="fas fa-tag" />  ${520000/1000 + 'k'}</p>
                <p><i className="fas fa-ruler-combined" /> 5000 sqft</p>
                </div>
                <div>
                <p><i className="fas fa-bed" />  3</p>
                <p><i className="fas fa-bath" />  2</p>
                </div>
            </div>
          </div>
          <div id="featuredCard">
            <div  className="card" id={1}>
                <img src={'/images/house2.jpg'} />
                <h4>12345 Somewhere Blvd, Nowhere, NA 54321</h4>
                <div>
                <p><i className="fas fa-tag" />  ${520000/1000 + 'k'}</p>
                <p><i className="fas fa-ruler-combined" /> 5000 sqft</p>
                </div>
                <div>
                <p><i className="fas fa-bed" />  3</p>
                <p><i className="fas fa-bath" />  2</p>
                </div>
            </div>
          </div>
          <div id="featuredCard">
            <div  className="card" id={1}>
                <img src={'/images/house2.jpg'} />
                <h4>12345 Somewhere Blvd, Nowhere, NA 54321</h4>
                <div>
                <p><i className="fas fa-tag" />  ${520000/1000 + 'k'}</p>
                <p><i className="fas fa-ruler-combined" /> 5000 sqft</p>
                </div>
                <div>
                <p><i className="fas fa-bed" />  3</p>
                <p><i className="fas fa-bath" />  2</p>
                </div>
            </div>
          </div>
          <div id="featuredCard">
            <div  className="card" id={1}>
                <img src={'/images/house2.jpg'} />
                <h4>12345 Somewhere Blvd, Nowhere, NA 54321</h4>
                <div>
                <p><i className="fas fa-tag" />  ${520000/1000 + 'k'}</p>
                <p><i className="fas fa-ruler-combined" /> 5000 sqft</p>
                </div>
                <div>
                <p><i className="fas fa-bed" />  3</p>
                <p><i className="fas fa-bath" />  2</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);
