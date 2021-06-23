import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainApp from './components/MainApp';
import Login from './pages/Login';
import AuthContextProvider from './context/AuthContext';

const App = () => {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Switch>
            <Route path='/login' component={Login} />
            <MainApp />
          </Switch>
        </AuthContextProvider>
      </Router>
    </>
  );
};

export default App;
