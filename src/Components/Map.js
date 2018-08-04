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
    beds: 2,
    baths: 1,
    sqft: 2500,
  },
  {
    id: 2,
    address: '54321 Place st, Marble AR 12345',
    city: 'Marble',
    price: 40000,
    lat: 36.15543,
    lng: -93.62228,
    image: 'house2.jpg',
    beds: 1,
    baths: 1,
    sqft: 800,
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
    beds: 2,
    baths: 2,
    sqft: 700,
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
    beds: 3,
    baths: 2,
    sqft: 1300,
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
    beds: 0,
    baths: 0,
    sqft: 100,
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
    beds: 4,
    baths: 3,
    sqft: 2000,
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
      beds: 0,
      baths: 0,
    }
  }

  componentDidMount = () => {
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
          <div  className="card" id={this.state.activeId == location.id ? 'active':null}>
            <h4>{location.address}</h4>
            <img src={location.image} />
            <div>
            <p>asking price: ${location.price.toLocaleString('en')}</p>
            <p>sq. feet: {location.sqft}</p>
            </div>
            <div>
            <p>bedrooms: {location.beds}</p>
            <p>bathrooms: {location.baths}</p>
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
              <input value={this.state.city} name="city" type="text"
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
