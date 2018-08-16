import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import GoogleMap from 'google-map-react';
import ReactSVG from 'react-svg';
import './CSS/House.css';

class House extends Component {
  constructor(){
    super();
    this.state = {
      house: {},
      images: [],
      years: 30,
      interest: 4.5,
    };
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/api/' + this.props.location.pathname)
    .then(res => res.json())
    .then(res => {
      this.setState({
        house: res.house,
        images: res.images
      })
    })
  }

  calculatePayment = () => {
    let p = parseFloat(this.state.house.price) * .8;
    let r = parseFloat(this.state.interest * .01 / 12);
    let r2 = parseFloat(1+r);
    let n = parseFloat(this.state.years * 12);
    let output = Math.floor(p * ((r * Math.pow(r2, n))/(Math.pow(r2, n) - 1)));
    return output;
  }

  render(){
    let imageUrl = '/images/' + this.state.house.address + '/';

    return (
      <div className="houseContainer">
        <div className="pricing houseCard">
          <div className="title">
            <p><i className="fas fa-tag" /> Pricing</p>
          </div>
          <div>
            <p>asking price: ${this.state.house.price/1000 + 'k'}</p>
          </div>
          <div>
            <p>price per sqft: ${(this.state.house.price/this.state.house.sqft).toFixed(2)}</p>
          </div>
          <div className="monthly">
            <p>est. monthly with <input type="text" onChange={(event) => this.setState({years: event.target.value})} value={this.state.years}/> year mortgage at <input type="text" value={this.state.interest} onChange={(event) => this.setState({interest: event.target.value})}/>
              %
            </p>
          </div>
          <div className="highlightedPrice">
            <h1>${this.calculatePayment()}</h1>
            <p>/monthly</p>
          </div>
          <div className="highlightedPrice">
            <h1>${this.state.house.price * .2 / 1000}k</h1>
            <p>down</p>
          </div>
        </div>

        <div className="images houseCard">
          <div className="title">
            <p><i className="fas fa-camera" /> Pictures</p>
          </div>
          <div className="carousel">
            <Carousel autoPlay
              infiniteLoop={true}
              width="100%"
              showThumbs={false}>

              {this.state.images.map(image =>
                <div>
                    <img src={imageUrl + image} />
                </div>
              )}
            </Carousel>
          </div>
        </div>
        <div className="location houseCard">
          <div className="title">
            <p><i className="fas fa-map-marker-alt" /> Location</p>
          </div>
          <div className="address">
            <p>{this.state.house.address}</p>
          </div>
          <div className="cardMap">
            <GoogleMap
              bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
              center={[this.state.house.lat, this.state.house.lng]}
              zoom={15}>
              <div className="marker"
                lat={this.state.house.lat}
                lng={this.state.house.lng}>
                <ReactSVG path={process.env.PUBLIC_URL + "/Map_marker.svg"} />
              </div>
            </GoogleMap>
          </div>
        </div>
        <div className="interior houseCard">
          <div className="title" id="interiorTitle">
            <p><i className="fas fa-home" /> Interior details</p>
          </div>
          <div>
            <i className="fas fa-bed" />
            <p> {this.state.house.beds}</p>
          </div>
          <div>
            <i className="fas fa-bath" />
            <p> {this.state.house.baths}</p>
          </div>
          <div>
            <i className="fas fa-ruler-combined" />
            <p className="detail"> sqft</p><p> {parseInt(this.state.house.sqft).toLocaleString('en')}</p>
          </div>
          <div id="lastInterior">
            <i className="fas fa-calendar-alt" />
            <p className="detail"> built in </p><p>1960</p>
          </div>
        </div>
        <div className="contact houseCard">
          <div className="title">
            <p><i className="fas fa-phone" /> Contact us</p>
          </div>
          <div>
            <input type="text" placeholder="Name"/>
          </div>
          <div>
            <input type="text" placeholder="phone #"/>
          </div>
          <div>
            <input type="text" placeholder="email"/>
          </div>
          <div>
            <input type="text" placeholder="message"/>
          </div>
          <button>Contact our Agents</button>
        </div>
        <div className="land houseCard">
          <div className="title">
            <p><i className="fas fa-image" /> Land details</p>
          </div>
          <div>
            <p>acres: 2</p>
          </div>
          <div>
            <p>trees: partial coverage</p>
          </div>
          <div>
            <p>Land type: Home</p>
          </div>
          <div>
            <p>fencing: partial</p>
          </div>
        </div>
      </div>
    )
  }
}

export default House;
