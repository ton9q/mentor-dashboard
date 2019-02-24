import React, { Component, Fragment } from 'react';

import SelectBox from './selectBox/SelectBox';
import TableBox from './table/tableBox';

import TableColorValue from './tableColorValue/tableColorValue';

import './App.css';
import data from '../../data/data.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      data: data
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(selected) {
    this.setState({ selected: selected.value });
  }

  render() {
    const { selected, data } = this.state;

    const mentors = [];
    data.pairs.forEach(element => {
      mentors.push(element.mentor);
    });

    return (
      <Fragment>
        <h1 className = "mainHeader">Mentor Dashboard</h1>
        <TableColorValue />
        <SelectBox mentors={mentors} selected={selected} onSelect={this.onSelect} />
        {selected !== '' && <TableBox data={data} selected={selected} />}
      </Fragment>
    );
  }
}

export default App;
