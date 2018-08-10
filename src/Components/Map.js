import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from 'google-map-react';
import ReactSVG from 'react-svg';
import DDmenu from './DD-Menu';
import './CSS/Map.css';



class Map extends Component {

  constructor(){
    super();
    this.state = {
      activeId: 0,
      minPrice: 0,
      maxPrice: 100000000000,
      sqft: 0,
      city: '',
      beds: 0,
      baths: 0,
      locations: [],
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/api/houses', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => this.setState({locations: res.houses}))

    if(this.props.location.state) {
      let searchTerms = this.props.location.state
      this.setState({
        minPrice: searchTerms.minPrice,
        maxPrice: searchTerms.maxPrice,
        sqft: searchTerms.sqft,
        city: searchTerms.city,
        beds: searchTerms.beds,
        baths: searchTerms.baths,
      })
    }
  }

  mouseOver = (id) => {
    this.setState({activeId: id})
  }

  mouseLeave = () => {
    this.setState({activeId: 0})
  }

  scroll = () => {
    let element = document.getElementById('active');
    element.scrollIntoView({behavior: "smooth"});
  }

  meetsSeachTerms = (location) => {
    if(location && location.price >= this.state.minPrice
      && location.price <= this.state.maxPrice
      && location.city.toLowerCase().includes(this.state.city.toLowerCase())
      && (location.beds - this.state.beds == 0 || this.state.beds == 0)
      && (location.baths - this.state.baths == 0 || this.state.baths == 0)
      && location.sqft >= this.state.sqft
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  renderLocationCard = (location) => {
    if(this.meetsSeachTerms(location)) {
        return (
          <div  className="card" id={this.state.activeId == location.id ? 'active':null} onClick={() => this.props.history.push('/houses/' + location.id)}>
              <img src={'/images/' + location.address + '/' + location.image} />
              <h4>{location.address}</h4>
              <div>
              <p><i className="fas fa-tag" />  ${location.price/1000 + 'k'}</p>
              <p><i className="fas fa-ruler-combined" /> {location.sqft} sqft</p>
              </div>
              <div>
              <p><i className="fas fa-bed" />  {location.beds}</p>
              <p><i className="fas fa-bath" />  {location.baths}</p>
              </div>
          </div>

        );
    }
  }

  renderMapMarker = (location) => {
    if(this.meetsSeachTerms(location)) {
      return (
        <div className="marker"
          lat={location.lat}
          lng={location.lng}
          onMouseEnter={() => this.mouseOver(location.id)}
          onMouseLeave={() => this.mouseLeave()}
          onClick={() => this.scroll()}>
          <ReactSVG path="./Map_marker.svg" />
        </div>
      )
    }
  }

  makeOptionList = (min, max, changeAmount, prefix, suffix,) => {
    let output = [];
    for(let i = min; i <= max; i += changeAmount) {
      output.push(<option value={i}>{prefix + i + suffix}</option>)
    }
    return output;
  }

  render() {


    return (
      <div className="container">
        <div className="search">
          <div>
            <label for="city">City</label>
            <input value={this.state.city} className="city" type="text"
              onChange={(event) => {
                this.setState({city: event.target.value})
              }} />
          </div>
          <div>
            <label><i className="fas fa-tag" /></label>
            <DDmenu />
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
        </div>
        <div className="map">
          <GoogleMap
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            center={[36.127819, -93.682299]}
            zoom={12}>
          {this.state.locations.map(location =>
            this.renderMapMarker(location)
          )}
          </GoogleMap>
        </div>
        <div className="cards">
          {this.state.locations.map(location =>
            this.renderLocationCard(location)
          )}
        </div>
      </div>
    )
  }
}

export default Map;
