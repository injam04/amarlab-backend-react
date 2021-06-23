import axios from 'axios';
import { createContext, Component } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn: false,
    apiKey: null,
    user_id: null,
  };

  handleIsLoggedIn = (value, key) => {
    this.setState({ isLoggedIn: value });
    this.setState({ apiKey: key });
  };

  setUserId = (id) => {
    this.setState({ user_id: id });
  };

  interceptor = (key) => {
    axios.interceptors.request.use((config) => {
      const token = 'Token ' + key;
      config.headers.Authorization = token;
      return config;
    });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setState({ apiKey: JSON.parse(token) });
      this.setState({ isLoggedIn: true });
      this.interceptor(JSON.parse(token));
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          handleIsLoggedIn: this.handleIsLoggedIn,
          interceptor: this.interceptor,
          setUserId: this.setUserId,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
