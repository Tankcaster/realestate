import React from 'react';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';

class DDmenu extends React.Component {
  constructor() {
    super();
    this.state = {
        isMenuOpen: false
    };
  }

  toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close = () => {
    this.setState({ isMenuOpen: false });
  }

  click = () => {
    console.log('You clicked an item');
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle:
      <select onClick={this.toggle}>
        <option value="" disabled selected hidden>Hello</option>
      </select>,
      align: 'left'
    };

    const nestedPropsMin = {
      toggle: <a href="#">Minimum $</a>,
      animate: true,
    }

    const nestedPropsMax = {
      toggle: <a href="#">Maximum $</a>,
      animate: true,
      direction: 'right',
      size: 'sm',
      leaveTimeout: '100'
    }
    return (
      <DropdownMenu {...menuOptions}>
        <li>
          <NestedDropdownMenu {...nestedPropsMin}>
          <li>$100,000</li>
          <li>$200,000</li>
          <li>$300,000</li>
          <li>$400,000</li>
          <li>$500,000</li>
          <li>$600,000</li>
          <li>$700,000</li>
          <li>$800,000</li>
          <li>$900,000</li>
          </NestedDropdownMenu>
          <NestedDropdownMenu {...nestedPropsMax}>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          <li><a href="#">$100,000</a></li>
          </NestedDropdownMenu>
        </li>
      </DropdownMenu>
    );
  }
}

export default DDmenu;
