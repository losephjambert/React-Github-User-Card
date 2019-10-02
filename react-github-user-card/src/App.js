import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// convert to class
// cDM --> get first user and add to user {}
// cDU --> get user.followers and add to followers []

// components
// UsersList
// UserCard

const axiosFn = async (baseURL, url) => {
  const res = await axios.get(`${baseURL}${url}`);
  const { data } = res.data;
  return data;
};

const d = new Date();

const baseURL = `https://api.github.com/`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserName: 'losephjambert',
      user: {},
      followers: [],
    };
  }

  componentDidMount() {
    const { currentUserName } = this.state;

    const user = axiosFn(baseURL, `users/${currentUserName}`);
    const followers = axiosFn(baseURL, `users/${currentUserName}/followers`);

    console.log(user);
    Promise.all([user]).then(values => {
      console.log('data', values);
    });
  }

  render() {
    return (
      <div>
        <header>header</header>
        <main>main</main>
        <footer>
          <p>&copy; {d.getFullYear()} Joseph Lambert</p>
        </footer>
      </div>
    );
  }
}

export default App;
