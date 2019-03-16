import React, { Component, Fragment } from 'react';

import SelectBox from './selectBox/SelectBox';
import TableBox from './table/tableBox';
import TableColorValue from './tableColorValue/tableColorValue';

import './App.css';

import { fb } from '../services/firebaseService';
import { userLoggedIn } from '../services/userLoggedInService';

import { getNicknameFromGithubLink } from '../constants/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      data: null,
      user: userLoggedIn.get(),
    };

    this.onSelect = this.onSelect.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => {
        console.log(err); // eslint-disable-line
      });
  }

  onSelect(selected) {
    this.setState({ selected: selected.value });
  }

  login() {
    fb.login()
      .then(data => {
        const user = {
          name: data.additionalUserInfo.profile.login,
          photo: data.additionalUserInfo.profile.avatar_url,
        };

        this.setState({ user });

        userLoggedIn.save(user);
      })
      .catch(function(error) {
        console.log(error.message); //eslint-disable-line
      });
  }

  logout() {
    fb.logout()
      .then(() => {
        this.setState({ user: null });

        userLoggedIn.remove();
      })
      .catch(function(error) {
        console.log(error.message); //eslint-disable-line
      });
  }

  render() {
    const { data, user } = this.state;
    let { selected } = this.state;

    const mentors = [];
    let mentorLogined = false;

    if (data !== null) {
      data.pairs.forEach(element => {
        mentors.push(element.mentor);
      });

      if (user !== null) {
        mentorLogined = true; // for all users which authorized
  
        mentors.map(mentor => {
          const githubName = getNicknameFromGithubLink(mentor.github);

          if (githubName === user.name) {
            mentorLogined = true;
  
            selected = user.name;
          }
        });
      }
    }

    return (
      <Fragment>
        <h1 className="header">Mentor Dashboard</h1>

        {user === null ? (
          <div className="nav">
            <button className="login" onClick={this.login}>Login</button>
          </div>
        ) : (
          <nav className="nav">
            <button onClick={this.logout}>Logout</button>
            <div className="right">
              <div className="welcome">
                <span>Hello, {user.name}!</span>
              </div>
              <img src={`${user.photo}`} alt="photo" />
            </div>
          </nav>
        )}

        {mentorLogined ? (
          <div className="main">
            <TableColorValue />
            <SelectBox mentors={mentors} selected={selected} onSelect={this.onSelect} />
            {selected !== '' && <TableBox data={data} selected={selected} />}
          </div>
        ) : (
          <div className="main">
            <p className="message-for-autorization">
              Sorry, but you are not mentor or not authorized! <br />
              You can`t see the content of the app.
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
