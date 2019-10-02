import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import styled from 'styled-components';

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

const StyledUserLink = styled.a`
  color: black;
  border: 2px solid black;
  background-color: white;
  display: flex;
`;

const StyledLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserCard = ({ avatar_url, bio, followers, following, location, name, html_url, login }) => (
  <section>
    <StyledUserLink href={html_url}>
      <figure>
        <img src={avatar_url} alt={`profile avatar of Github User ${login}`} />
        {name && <h2>{name}</h2>}
        <figcaption>{login}</figcaption>
      </figure>
    </StyledUserLink>
    <ul>
      <li>{bio}</li>
      <li>{location}</li>
      <li>Followers: {followers}</li>
      <li>Following: {following}</li>
    </ul>
  </section>
);

const FollowerCard = ({ avatar_url, login, html_url }) => (
  <StyledUserLink href={html_url}>
    <figure>
      <img src={avatar_url} alt={`profile avatar of Github User ${login}`} />
      <figcaption>{login}</figcaption>
    </figure>
  </StyledUserLink>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserName: 'losephjambert',
      user: {},
      followers: [],
      isLoading: true,
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

  componentDidUpdate(prevProps, prevState) {
    const { followers, isLoading } = this.state;
    if (prevState.followers !== followers) this.setState({ isLoading: !isLoading });
  }

  render() {
    const { user, followers, isLoading } = this.state;

    if (isLoading) {
      return (
        <StyledLoadingContainer>
          <p>Loading page content, please wait.</p>
        </StyledLoadingContainer>
      );
    }

    return (
      <div>
        <header>
          <h1>{user.name}'s Github Profile and Followers</h1>
        </header>
        <main>
          <UserCard {...user} />
          <ul>
            {followers.map(follower => (
              <li key={follower.id}>
                <FollowerCard {...follower} />
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
