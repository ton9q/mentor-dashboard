import React, { Component, Fragment } from 'react';

import SelectBox from './selectBox/SelectBox';
import TableBox from './table/tableBox';
import TableColorValue from './tableColorValue/tableColorValue';

import './App.css';

import { fb } from '../services/firebaseService';
import data from '../../assets/data/data.json';

import { getNicknameFromGithubLink } from '../constants/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      data: data,
      username: null,
    };

    this.onSelect = this.onSelect.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // async componentDidMount() {
  //   await fetch('/data', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ data });
  //       console.log(this.state.data);
  //     })
  //     .catch(err => {
  //       console.log(err); // eslint-disable-line
  //     });
  // }

  onSelect(selected) {
    this.setState({ selected: selected.value });
  }

  login() {
    fb.login()
      .then(data => {
        const username = data.additionalUserInfo.username;
        this.setState({ username });
      })
      .catch(function(error) {
        console.log(error.message); //eslint-disable-line
      });
  }

  logout() {
    fb.logout()
      .then(() => {
        this.setState({ username: null });
      })
      .catch(function(error) {
        console.log(error.message); //eslint-disable-line
      });
  }

  render() {
    const { selected, data, username } = this.state;
    console.log('data', data);

    const mentors = [];
    data.pairs.forEach(element => {
      mentors.push(element.mentor);
    });
    let mentorLogined = false;

    if (username) {
      mentorLogined = true; // for all users which authorized

      mentors.map(mentor => {
        const githubName = getNicknameFromGithubLink(mentor.github);
        if (githubName === username) {
          mentorLogined = true;
        }
      });
    }

    return (
      <Fragment>
        <h1 className="mainHeader">Mentor Dashboard</h1>
        {username === null ? (
          <button onClick={this.login}>login</button>
        ) : (
          <div>
            <button onClick={this.logout}>logout</button>
            <span>Hello, {username}!</span>
          </div>
        )}
        {mentorLogined ? (
          <div>
            <TableColorValue />
            <SelectBox mentors={mentors} selected={selected} onSelect={this.onSelect} />
            {selected !== '' && <TableBox data={data} selected={selected} />}
          </div>
        ) : (
          <div />
        )}
      </Fragment>
    );
  }
}

export default App;
