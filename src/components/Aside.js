import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Aside = ({ asideOpen, setAsideClose }) => {
  const { user_details } = useContext(AuthContext);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const location = useLocation();
  // const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    if (location.pathname === '/') {
      setIsHomeActive(true);
    } else {
      setIsHomeActive(false);
    }

    // const user_details = localStorage.getItem('user_details');
    // if (user_details) {
    //   const userRole = JSON.parse(user_details);
    //   console.log(userRole.groups);
    //   if (userRole.groups.length === 0) {
    //     setShowHome(false);
    //   } else {
    //     setShowHome(true);
    //   }
    // }
  }, [location]);

  return (
    <div
      className={`aside aside-left d-flex aside-fixed ${
        asideOpen ? 'aside-on' : ''
      }`}
      id='kt_aside'
      style={{ width: 'auto' }}
    >
      <div className='aside-secondary d-flex flex-row-fluid'>
        <div className='aside-workspace scroll scroll-push ps ps--active-y'>
          <div className='tab-content'>
            <div
              className='tab-pane p-3 py-lg-5 fade show active'
              id='kt_aside_tab_2'
            >
              <div
                className='aside-menu-wrapper flex-column-fluid py-5'
                id='kt_aside_menu_wrapper'
              >
                <div className='aside-menu min-h-lg-800px' id='kt_aside_menu'>
                  <ul className='menu-nav'>
                    {user_details && user_details.groups.length !== 0 && (
                      <>
                        {user_details.groups[0].name === 'Admin' && (
                          <li className='menu-item'>
                            <Link
                              to='/'
                              className={`${
                                isHomeActive ? 'active' : ''
                              } menu-link`}
                              onClick={() => setAsideClose()}
                            >
                              <span className='svg-icon menu-icon'>
                                <i className='fas fa-home' />
                              </span>
                              <span className='menu-text'>Overview</span>
                            </Link>
                          </li>
                        )}
                        {user_details.groups[0].name === 'Order Manager' && (
                          <li className='menu-item'>
                            <Link
                              to='/'
                              className={`${
                                isHomeActive ? 'active' : ''
                              } menu-link`}
                              onClick={() => setAsideClose()}
                            >
                              <span className='svg-icon menu-icon'>
                                <i className='fas fa-home' />
                              </span>
                              <span className='menu-text'>Overview</span>
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                    <li className='menu-item'>
                      <NavLink
                        to='/orders'
                        className='menu-link'
                        onClick={() => setAsideClose()}
                      >
                        <span className='svg-icon menu-icon'>
                          <i className='fas fa-list'></i>
                        </span>
                        <span className='menu-text'>Orders</span>
                      </NavLink>
                    </li>
                    {user_details && user_details.groups.length !== 0 && (
                      <>
                        {user_details.groups[0].name === 'Admin' && (
                          <li className='menu-item'>
                            <NavLink
                              to='/users'
                              className='menu-link'
                              onClick={() => setAsideClose()}
                            >
                              <span className='svg-icon menu-icon'>
                                <i className='fas fa-users' />
                              </span>
                              <span className='menu-text'>Users</span>
                            </NavLink>
                          </li>
                        )}
                      </>
                    )}

                    {/* <li className='menu-item'>
                      <Link
                        to='/my-profile'
                        className='menu-link'
                        onClick={() => setAsideClose()}
                      >
                        <span className='svg-icon menu-icon'>
                          <i className='fas fa-user'></i>
                        </span>
                        <span className='menu-text'>My Profile</span>
                      </Link>
                    </li> */}
                    {/* <li className='menu-item'>
                      <a href='?#' className='menu-link' onClick={handleLogout}>
                        <span className='svg-icon menu-icon'>
                          <i className='fas fa-power-off'></i>
                        </span>
                        <span className='menu-text'>Logout</span>
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
