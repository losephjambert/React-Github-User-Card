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
  box-shadow: 0 0 0 3px black;
  background-color: white;
  display: flex;
  max-width: 300px;
  margin-bottom: 2rem;
  padding: 20px;
  transition: 200ms;
  text-decoration: none;

  &:hover {
    box-shadow: 0 0 0 3px gold;
  }

  figure {
    margin: 0;
    padding: 0;
  }
`;

const StyledUserSection = styled.section`
  display: flex;
  flex-direction: column-reverse;

  ul {
    margin-bottom: 2rem;
  }
`;

const StyledContainer = styled.div`
  padding: 25px;
  margin: 25px;
  box-shadow: inset 0 0 0 5px black;
`;

const StyledUserDetails = styled.ul``;

const StyledFollowersList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;

  li {
    flex-basis: 200px;
  }
`;

const UserCard = ({ avatar_url, bio, followers, following, location, name, html_url, login }) => (
  <StyledUserSection>
    <StyledUserLink href={html_url}>
      <figure>
        <img src={avatar_url} alt={`profile avatar of Github User ${login}`} />
        {name && <h2>{name}</h2>}
        <figcaption>{login}</figcaption>
      </figure>
    </StyledUserLink>
    <StyledUserDetails>
      <li>
        <h3>{name}'s Profile Details</h3>
      </li>
      <li>{bio}</li>
      <li>{location}</li>
      <li>Followers: {followers}</li>
      <li>Following: {following}</li>
    </StyledUserDetails>
  </StyledUserSection>
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
          <h1>{user.name}'s Github Profile</h1>
        </header>
        <main>
          <StyledContainer>
            <UserCard {...user} />
            <section>
              <h2>Followers</h2>
              <StyledFollowersList>
                {followers.map(follower => (
                  <li key={follower.id}>
                    <FollowerCard {...follower} />
                  </li>
                ))}
              </StyledFollowersList>
            </section>
          </StyledContainer>
        </main>
        <footer>
          <p>&copy; {d.getFullYear()} Joseph Lambert</p>
        </footer>
      </div>
    );
  }
}

export default App;
