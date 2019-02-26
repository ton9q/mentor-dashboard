import React, { Component } from 'react';

import { STATUS_COLORS } from '../../constants/index';

import './tableColorValue.css';

class TableColorValue extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  render() {
    let styleButton;

    if (this.state.showMenu) {
      styleButton = {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)',
      };
    } else styleButton = {};

    return (
      <div className="color-menu">
        <button className="color-menu__header" style={styleButton} onClick={this.showMenu}>
          Color value
        </button>

        {this.state.showMenu ? (
          <div
            className="table-color-value"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <div className={`${STATUS_COLORS.checked}`}>
              <span>Checked</span>
            </div>
            <div className={`${STATUS_COLORS.inProgress}`}>
              <span>In Progress</span>
            </div>
            <div className={`${STATUS_COLORS.checking}`}>
              <span>Checking</span>
            </div>
            <div className={`${STATUS_COLORS.notPassed}`}>
              <span>Not Passed</span>
            </div>
            <div className={`${STATUS_COLORS.noStatus}`}>
              <span>ToDo</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TableColorValue;
