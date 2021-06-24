import axios from 'axios';
import { createContext, Component } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn: false,
    apiKey: null,
    user_details: null,
  };

  handleIsLoggedIn = (value, key) => {
    this.setState({ isLoggedIn: value });
    this.setState({ apiKey: key });
  };

  interceptor = (key) => {
    axios.interceptors.request.use((config) => {
      const token = 'Token ' + key;
      config.headers.Authorization = token;
      return config;
    });
  };

  setUserDetails = (data) => {
    this.setState({ user_details: data });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setState({ apiKey: JSON.parse(token) });
      this.setState({ isLoggedIn: true });
      this.interceptor(JSON.parse(token));
    }

    const user_details = localStorage.getItem('user_details');
    if (user_details) {
      this.setState({ user_details: JSON.parse(user_details) });
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          handleIsLoggedIn: this.handleIsLoggedIn,
          interceptor: this.interceptor,
          setUserDetails: this.setUserDetails,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
