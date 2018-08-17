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
      sqft: null,
      type: 0,
      acreage: null,
      treeCover: '',
      fencing: '',
      animals: '',
      description: '',
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

  renderHouseForm = () => {
    return (
      <div>
        <div>
          <input
            type='text'
            value={this.state.price}
            onChange={(event) => this.setState({price: event.target.value})}
            placeholder='price'
          />
        </div>
        <div>
          <input
            type='text'
            value={this.state.beds}
            onChange={(event) => this.setState({beds: event.target.value})}
            placeholder='beds'
          />
        </div>
        <div>
          <input
            type='text'
            value={this.state.baths}
            onChange={(event) => this.setState({baths: event.target.value})}
            placeholder='baths'
          />
        </div>
        <div>
          <input
            type='text'
            value={this.state.sqft}
            onChange={(event) => this.setState({sqft: event.target.value})}
            placeholder='sqft'
          />
        </div>
      </div>
    )
  }

  renderLandForm = () => {
    return (
      <div>
        <div>
          <div>
            <input
              type="text"
              value={this.state.acreage}
              onChange={(event) => this.setState({acreage: this.state.event})}
              placeholder="acreage"
            />
          </div>
          <div>
            <input
              type="text"
              value={this.state.treeCover}
              onChange={(event) => this.setState({treeCover: this.state.event})}
              placeholder="tree coverage"
            />
          </div>
          <div>
            <input
              type="text"
              value={this.state.fencing}
              onChange={(event) => this.setState({fencing: this.state.event})}
              placeholder="fencing coverage"
            />
          </div>
          <div>
            <input
              type="text"
              value={this.state.animals}
              onChange={(event) => this.setState({animals: this.state.event})}
              placeholder="livestock allowed"
            />
          </div>
        </div>
      </div>
    )
  }

  renderRelevantForm = () => {
    let output = [];
    if(this.state.type == 0) {
      output.push(this.renderHouseForm());
    }
    else if(this.state.type == 1) {
      output.push(this.renderLandForm());
    }
    else if(this.state.type == 2) {
      output.push(this.renderHouseForm());
      output.push(this.renderLandForm());
    }
    return output;
  }

  render() {
    return(
      <div style={{marginLeft: '1rem'}}>
        <div>
          <label>Property Type </label>
          <select onChange={(event) => this.setState({type: event.target.value}, console.log(this.state.type))}>
            <option value={0}>House</option>
            <option value={1}>Land</option>
            <option value={2}>House + Land</option>
          </select>
        </div>
        <div>
          <input
            type='text'
            value={this.state.address}
            onChange={(event) => this.setState({address: event.target.value})}
            placeholder='address'
          />
        </div>
        {this.renderRelevantForm()}
        <div>
          <input
            type='text'
            value={this.state.city}
            onChange={(event) => this.setState({city: event.target.value})}
            placeholder='city'
          />
        </div>
        <div>
          <textarea
            value={this.state.description}
            onChange={(event) => this.setState({description: event.target.value})}
            placeholder="description"
          />
        </div>
        <div>
          <input
            type='file'
            multiple="true"
            onChange={(event) => this.setState({image: event.target.files})}
          />
        </div>
        <div>
          <label>Feature this property?</label>
          <input type="checkbox" />
        </div>
      <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    )
  }
}

export default HouseForm;
