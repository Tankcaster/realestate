import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import ReactSVG from 'react-svg';
import './CSS/Map.css';

let locations = [
  {
    id: 1,
    address: '12345 Somewhere blvd, Alabam AR 12345',
    city: 'Alabam',
    price: 30000,
    lat: 36.127819,
    lng: -93.682299,
    image: 'house1.jpg',
  },
  {
    id: 2,
    address: '54321 Place st, Marble AR 12345',
    city: 'Marble',
    price: 40000,
    lat: 36.15543,
    lng: -93.62228,
    image: 'house2.jpg',
  },
  {
    id: 3,
    address: '69705 Street pl, Marble AR 12356',
    city: 'Marble',
    acres: 200,
    price: 45000,
    lat: 36.16543,
    lng: -93.58228,
    image: 'house3.jpg',
  },
  {
    id: 4,
    address: '18352 Parkway Blvd, Marble AR 12345',
    city: 'Marble',
    acres: 200,
    price: 20000,
    lat: 36.17543,
    lng: -93.62228,
    image: 'house4.jpg',
  },
  {
    id: 5,
    address: '00000 Nowhere St, Void NA 00000',
    city: 'Void',
    acres: 200,
    price: 10000,
    lat: 36.19543,
    lng: -93.52228,
    image: 'house5.jpg',
  },
  {
    id: 6,
    address: '85632 Boulevard Dr, Forum AR 12445',
    city: 'Forum',
    acres: 200,
    price: 70000,
    lat: 36.20543,
    lng: -93.72228,
    image: 'house6.jpg',
  }
]

class Map extends Component {

  constructor(){
    super();
    this.state = {
      activeId: 0,
      minPrice: 0,
      maxPrice: 100000000000,
      sqft: 0,
      city: '',
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
    if(location && location.price > this.state.minPrice
      && location.price < this.state.maxPrice
      && location.city.toLowerCase().includes(this.state.city.toLowerCase())
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
          <div  className="card" id={this.state.activeId == location.id ? 'active':null}>
            <h4>{location.address}</h4>
            <img src={location.image} />
            <div>
            <p>asking price: ${location.price.toLocaleString('en')}</p>
            <p>acreage: {location.acres}</p>
            </div>
            <div>
            <p>bedrooms: 2</p>
            <p>bathrooms: 3</p>
            <p>sq. feet: 500</p>
            </div>
            <button href="#">Learn More</button>
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

  render() {
    return (
      <div className="container">
        <div className="map">
          <GoogleMap
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            center={[36.127819, -93.682299]}
            zoom={12}>
          {locations.map(location =>
            this.renderMapMarker(location)
          )}
          </GoogleMap>
        </div>
        <div className="cards">
          <div className="search">
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
                <select>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
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
          </div>
          {locations.map(location =>
            this.renderLocationCard(location)
          )}
        </div>
      </div>
    )
  }
}

export default Map;
