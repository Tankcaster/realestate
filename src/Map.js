import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';

export default class SimpleHoverMapPage extends Component {

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <GoogleMap
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}
        >
      </GoogleMap>
    );
  }
}
