import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const d = new Date();
const baseURL = `https://api.github.com/`;

// convert to class
// cDM --> get first user and add to user {}
// cDU --> get user.followers and add to followers []

// components
// UsersList
// UserCard

const axiosFn = async (baseURL, url) => {
  try {
    const res = await axios.get(`${baseURL}${url}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const UserCard = ({
  avatar_url,
  bio,
  followers,
  following,
  location,
  name,
  html_url,
  login
}) => (
  <section>
    <figure>
      <img src={avatar_url} alt={`profile avatar of Github User ${login}`} />
      {name && <h2>{name}</h2>}
      <figcaption>{login}</figcaption>
    </figure>
  </section>
);

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
    const { user, followers } = this.state;

    return (
      <div>
        <header>
          <h1>Github User Card</h1>
        </header>
        <main>
          <UserCard {...user} />
          <ul>
            {followers.map(follower => (
              <li key={follower.id}>
                <UserCard {...follower} />
              </li>
            ))}
          </ul>
        </main>
        <footer>
          <p>&copy; {d.getFullYear()} Joseph Lambert</p>
        </footer>
      </div>
    );
  }
}

export default App;
