import React from 'react';

class HouseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      city: '',
      price: '',
      image: null,
      beds: null,
      baths: null,
      sqft: null
    };
  }

  handleSubmit = () => {
    let fd = new FormData();
    fd.append('address', this.state.address);
    fd.append('city', this.state.city);
    fd.append('price', this.state.price);
    fd.append('beds', this.state.beds);
    fd.append('baths', this.state.baths);
    fd.append('sqft', this.state.sqft);
    //fd.append('img', this.state.image);
    for(let i = 0; i < this.state.image.length; i++) {
      fd.append('img', this.state.image[i], this.state.image[i].name)
    }


    fetch('http://localhost:5000/api/houses', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: fd
    })
    .then(console.log('welp'))
  }

  render() {
    return(
      <div>
        <input
          type='text'
          value={this.state.address}
          onChange={(event) => this.setState({address: event.target.value})}
          placeholder='address'
        />
        <input
          type='text'
          value={this.state.city}
          onChange={(event) => this.setState({city: event.target.value})}
          placeholder='city'
        />
        <input
          type='text'
          value={this.state.price}
          onChange={(event) => this.setState({price: event.target.value})}
          placeholder='price'
        />
        <input
          type='text'
          value={this.state.beds}
          onChange={(event) => this.setState({beds: event.target.value})}
          placeholder='beds'
        />
        <input
          type='text'
          value={this.state.baths}
          onChange={(event) => this.setState({baths: event.target.value})}
          placeholder='baths'
        />
        <input
          type='text'
          value={this.state.sqft}
          onChange={(event) => this.setState({sqft: event.target.value})}
          placeholder='sqft'
        />
        <input
          type='file'
          multiple="true"
          onChange={(event) => this.setState({image: event.target.files})}
        />
      <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    )
  }
}

export default HouseForm;
