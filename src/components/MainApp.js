import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import amarlabLogo from '../assets/img/logo.png';
import Orders from '../pages/Orders';
import Aside from './Aside';
import Users from './Users';

class MainApp extends Component {
  state = {};

  render() {
    return (
      <div
        id='kt_body'
        className='header-mobile-fixed subheader-enabled aside-enabled aside-fixed aside-secondary-enabled'
      >
        <div id='kt_header_mobile' className='header-mobile'>
          <a href='?#'>
            <img
              alt='Logo'
              src={amarlabLogo}
              className='logo-default max-h-30px'
            />
          </a>
          <div className='d-flex align-items-center'>
            <button
              className='btn p-0 burger-icon burger-icon-left'
              id='kt_aside_mobile_toggle'
            >
              <span />
            </button>
          </div>
        </div>

        <div className='d-flex flex-column flex-root'>
          <div className='d-flex flex-row flex-column-fluid page'>
            <Aside />

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
                    <Route path='/orders' component={Orders} />
                    <Route path='/users' component={Users} />
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
