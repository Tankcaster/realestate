import React, { Component } from 'react';
import logo from './logo.svg';
import GoogleMap from 'google-map-react';
import ReactSVG from 'react-svg'
import './App.css';

let locations = [
  {
    id: 1,
    address: '12345 Somewhere blvd, Alabam AR 12345',
    acres: 200,
    price: '$50,000',
    lat: 36.127819,
    lng: -93.682299,
    image: 'house1.jpg',
  },
  {
    id: 2,
    address: '54321 Place st, Marble AR 12345',
    acres: 200,
    price: '$50,000',
    lat: 36.15543,
    lng: -93.62228,
    image: 'house2.jpg',
  },
  {
    id: 3,
    address: '69705 Street pl, Marble AR 12356',
    acres: 200,
    price: '$50,000',
    lat: 36.16543,
    lng: -93.58228,
    image: 'house3.jpg',
  },
  {
    id: 4,
    address: '18352 Parkway Blvd, Marble AR 12345',
    acres: 200,
    price: '$50,000',
    lat: 36.17543,
    lng: -93.62228,
    image: 'house4.jpg',
  },
  {
    id: 5,
    address: '00000 Nowhere St, Void NA 00000',
    acres: 200,
    price: '$50,000',
    lat: 36.19543,
    lng: -93.52228,
    image: 'house5.jpg',
  },
  {
    id: 6,
    address: '85632 Boulevard Dr, Forum AR 12445',
    acres: 200,
    price: '$50,000',
    lat: 36.20543,
    lng: -93.72228,
    image: 'house6.jpg',
  }
]

class App extends Component {
  constructor(){
    super();
    this.state = {
      activeId: 0
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

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2>Mountain Creek Real Estate Co</h2>
          <nav>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Etc</a>
          </nav>
        </div>
        <div className="map">
          <GoogleMap
            bootstrapURLKeys={{ key: 'AIzaSyAX5OAHDNVgrj8mR_sCvk60RpCkhiQJECE' }}
            center={[36.127819, -93.682299]}
            zoom={12}>
          {locations.map(location =>
            <div className="marker"
              lat={location.lat}
              lng={location.lng}
              onMouseEnter={() => this.mouseOver(location.id)}
              onMouseLeave={() => this.mouseLeave()}
              onClick={() => this.scroll()}>
              <ReactSVG path="./Map_marker.svg" />
            </div>
          )}
          </GoogleMap>
        </div>
        <div className="cards">
          {locations.map(location =>
            <div  className="card" id={this.state.activeId == location.id ? 'active':null}>
              <h4>{location.address}</h4>
              <img src={location.image} />
              <div>
              <p>asking price: {location.price}</p>
              <p>acreage: {location.acres}</p>
              </div>
              <div>
              <p>bedrooms: 2</p>
              <p>bathrooms: 3</p>
              <p>sq. feet: 500</p>
              </div>
              <button href="#">Learn More</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
