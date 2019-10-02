import React, { Component } from "react";
import axios from "axios";
import "./App.css";

// convert to class
// cDM --> get first user and add to user {}
// cDU --> get user.followers and add to followers []

// components
// UsersList
// UserCard

const axiosFn = async (baseURL, url) => {
  console.log(`${baseURL}${url}`);
  try {
    const res = await axios.get(`${baseURL}${url}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const d = new Date();

const baseURL = `https://api.github.com/`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserName: "losephjambert",
      user: {},
      followers: []
    };
  }

  componentDidMount() {
    const { currentUserName } = this.state;

    axiosFn(baseURL, `users/${currentUserName}`).then(res => {
      this.setState({ user: res });
    });
    axiosFn(baseURL, `users/${currentUserName}/followers`).then(res => {
      this.setState({ followers: res });
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
