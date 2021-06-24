import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import amarlabLogo from '../assets/img/logo.png';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';
import Homepage from '../pages/Homepage';
import MyProfile from '../pages/MyProfile';
import Orders from '../pages/Orders';
import Aside from './Aside';
import PrivateRoute from './PrivateRoute';
import Users from './Users';

class MainApp extends Component {
  state = {
    asideOpen: false,
  };

  setAsideClose = () => {
    this.setState({ asideOpen: false });
  };

  render() {
    const { asideOpen } = this.state;

    return (
      <div
        id='kt_body'
        className='header-mobile-fixed subheader-enabled aside-enabled aside-fixed aside-secondary-enabled'
      >
        <div id='kt_header_mobile' className='header-mobile'>
          <Link to='/'>
            <img
              alt='Logo'
              src={amarlabLogo}
              className='logo-default max-h-30px'
            />
          </Link>
          <div className='d-flex align-items-center'>
            <button
              className='btn p-0 burger-icon burger-icon-left'
              id='kt_aside_mobile_toggle'
              onClick={() => this.setState({ asideOpen: !asideOpen })}
            >
              <span />
            </button>
          </div>
        </div>

        <div className='d-flex flex-column flex-root'>
          <div className='d-flex flex-row flex-column-fluid page'>
            <Aside
              asideOpen={this.state.asideOpen}
              setAsideClose={this.setAsideClose}
            />

            <div
              className='d-flex flex-column flex-row-fluid wrapper'
              id='kt_wrapper'
            >
              <div
                className='content d-flex flex-column flex-column-fluid'
                id='kt_content'
                style={{ minHeight: '93vh' }}
              >
                <div className='d-flex flex-column-fluid'>
                  <div className='container' style={{ margin: '40px 0' }}>
                    <Route exact path='/' component={Homepage} />
                    <PrivateRoute path='/orders' component={Orders} />
                    <PrivateRoute path='/users' component={Users} />
                    <PrivateRoute path='/user-add' component={AddUser} />
                    <PrivateRoute path='/my-profile' component={MyProfile} />
                    <Route path='/user/:id' component={EditUser} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainApp;