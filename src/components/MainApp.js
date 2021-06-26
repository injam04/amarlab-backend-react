import { Dropdown } from 'react-bootstrap';
import React, { Component } from 'react';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { Link, Route } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import amarlabLogo from '../assets/img/logo.png';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';
import Homepage from '../pages/Homepage';
import MyProfile from '../pages/MyProfile';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import Aside from './Aside';
import PrivateRoute from './PrivateRoute';
import Users from './Users';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

class MainApp extends Component {
  state = {
    asideOpen: false,
  };

  setAsideClose = () => {
    this.setState({ asideOpen: false });
  };

  handleLogout = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/logout/`)
      .then((resp) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_details');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    const { asideOpen } = this.state;
    const { user_details } = this.context;

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
                id='kt_header'
                className='header header-fixed'
                // style={{ backgroundColor: '#fff', padding: '15px 0' }}
              >
                <div className='container-fluid d-flex align-items-stretch justify-content-end'>
                  {/* <h5 className='welcome_text mb-0 mr-2'>Welcome </h5> */}
                  <Dropdown>
                    <DropdownToggle>
                      <h5 className='mb-0 d-flex'>
                        Welcome {user_details ? user_details.username : ''}{' '}
                        <i className='fas fa-sort-down ml-1'></i>
                      </h5>
                    </DropdownToggle>
                    <DropdownMenu>
                      <Link to='/my-profile' className='dropdown-item'>
                        My Profile
                      </Link>
                      <a
                        href='?#'
                        onClick={this.handleLogout}
                        className='dropdown-item'
                      >
                        Logout
                      </a>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
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
                    <Route path='/order/:id' component={OrderDetails} />
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

MainApp.contextType = AuthContext;
