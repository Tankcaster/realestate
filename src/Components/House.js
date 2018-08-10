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
      images: []
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
            <p>est. monthly payment: ${Math.floor(this.state.house.price/(30*12))}</p>
          </div>
          <div>
            <p>price per sqft: ${(this.state.house.price/this.state.house.sqft).toFixed(2)}</p>
            <p>with 30 year mortgage</p>
          </div>
        </div>
        <div className="images houseCard">
          <div className="title">
            <p><i className="fas fa-images" /> Pictures</p>
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
          <div>
            <i className="fas fa-calendar-alt" />
            <p className="detail"> built in </p><p>1960</p>
          </div>
        </div>
        <div className="contact houseCard">
          <div className="title">
            <p><i className="fas fa-phone" /> Contact</p>
          </div>
          <p>Like what you see? Get in touch! You can call us at 1-888-123-4567 or email us at bob@mountaincreek.com</p>
        </div>

      </div>
    )
  }
}

export default House;
