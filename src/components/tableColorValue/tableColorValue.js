import React, { Component } from 'react';

import { STATUS_COLORS } from '../../constants/index';

// import './tableColorValue';

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
    return (
      <div>
        <div style={{ height: '100px' }} onClick={this.showMenu}>
          Color value
        </div>

        {this.state.showMenu ? (
          <div
            style={{ position: 'absolute', zIndex: 1, top: '100px' }}
            className="tableColorValue"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <div className={`${STATUS_COLORS.checked}`}>Checked</div>
            <div className={`${STATUS_COLORS.inProgress}`}>In Progress</div>
            <div className={`${STATUS_COLORS.checking}`}>Checking</div>
            <div className={`${STATUS_COLORS.notPassed}`}>Not Passed</div>
            <div className={`${STATUS_COLORS.noStatus}`}>ToDo</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TableColorValue;
