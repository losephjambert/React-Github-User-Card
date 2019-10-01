import React, { Component } from 'react';
import './App.css';

// convert to class
// cDM --> get first user and add to user {}
// cDU --> get user.followers and add to followers []

// components
// UsersList
// UserCard

const d = new Date();

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserName: 'losephjambert',
      user: {},
      followers: [],
    };
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
