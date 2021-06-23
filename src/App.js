import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainApp from './components/MainApp';
import Login from './pages/Login';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <MainApp />
        </Switch>
      </Router>
    </>
  );
};

export default App;
