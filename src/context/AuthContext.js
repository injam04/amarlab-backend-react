// import axios from 'axios';
import { createContext, Component } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn: false,
    apiKey: null,
  };

  handleIsLoggedIn = (value, key) => {
    this.setState({ isLoggedIn: value });
    this.setState({ apiKey: key });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setState({ apiKey: JSON.parse(token) });
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          handleIsLoggedIn: this.handleIsLoggedIn,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
