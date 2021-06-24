import { Link } from 'react-router-dom';

const Aside = ({ asideOpen, setAsideClose }) => {
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
                    <li className='menu-item'>
                      <Link
                        to='/'
                        className='menu-link'
                        onClick={() => setAsideClose()}
                      >
                        <span className='svg-icon menu-icon'>
                          <i className='fas fa-home' />
                        </span>
                        <span className='menu-text'>Home</span>
                      </Link>
                    </li>
                    <li className='menu-item'>
                      <Link
                        to='/orders'
                        className='menu-link'
                        onClick={() => setAsideClose()}
                      >
                        <span className='svg-icon menu-icon'>
                          <i className='fas fa-list'></i>
                        </span>
                        <span className='menu-text'>Orders</span>
                      </Link>
                    </li>
                    <li className='menu-item'>
                      <Link
                        to='/users'
                        className='menu-link'
                        onClick={() => setAsideClose()}
                      >
                        <span className='svg-icon menu-icon'>
                          <i className='fas fa-users' />
                        </span>
                        <span className='menu-text'>Users</span>
                      </Link>
                    </li>

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
