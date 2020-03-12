import React from 'react';

export const UserContext = React.createContext({});

class UserProvider extends React.Component {
  state = {
    isLoggedIn: false,
    token: null,
  }

  get actions() {
    return {
      onLogin: (token) => this.setState({ token, isLoggedIn: true }),
      onLogout: () => this.setState({ token: null, isLoggedIn: false }),
    }
  }

  componentDidMount() {
    //check token in localstorage
    // parse token
    // check if token is valid
    // if so, log user in, otherwise keep them logged out

    this.setState({ token: 'foo', isLoggedIn: true });
  }

  render() {
    const { isLoggedIn, token } = this.state;
    const { children } = this.props;

    return (
      <UserContext.Provider value={{
        isLoggedIn,
        token,
        actions: this.actions,
      }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
