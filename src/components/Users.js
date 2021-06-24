import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import blank from '../assets/img/blank.png';

class Users extends Component {
  state = {
    users: [],
    user_id: null,
    group: [],
  };

  fetchUsers = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/?page=1&limit=10&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        this.setState({ users: resp.data.results });
      });
  };

  fetchGroup = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_management/group/`)
      .then((resp) => {
        // console.log(resp.data.results);
        this.setState({ group: resp.data.results });
      });
  };

  groupIdToName = (grp_id) => {
    const array = this.state.group.filter((group) => {
      return group.id === grp_id;
    });
    const name = array[0];
    return name ? name.name : 'No role';
  };

  componentDidMount() {
    this.fetchUsers();
    this.fetchGroup();
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      this.setState({ user_id: JSON.parse(user_id) });
    }
  }

  deleteUser = (user) => {
    // console.log(user.id);

    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/${user.id}/`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({
          users: this.state.users.filter((use) => use.id !== user.id),
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    const { users, user_id } = this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-custom card-stretch gutter-b'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label font-weight-bolder text-dark'>
                  All Users
                </span>
                <span className='text-muted mt-3 font-weight-bold font-size-sm'>
                  More than {users.length}+ users
                </span>
              </h3>
              <div className='card-toolbar'>
                <Link to='/user-add' className='btn btn-primary'>
                  Add New User
                </Link>
              </div>
            </div>
            <div className='card-body pt-2 pb-0 mt-n3'>
              <div className='table-responsive'>
                <table className='table table-borderless table-vertical-center'>
                  <thead>
                    <tr>
                      <th className='p-0 w-50px'></th>
                      <th className='p-0 min-w-150px'></th>
                      <th className='p-0 min-w-140px'></th>
                      <th className='p-0 min-w-110px'></th>
                      <th className='p-0 min-w-50px'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length !== 0 &&
                      users.map((user, i) => (
                        <tr key={i}>
                          <td className='py-5 pl-0'>
                            <div className='symbol symbol-50 symbol-light mr-2'>
                              <span className='symbol-label'>
                                <img
                                  src='https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/avatars/001-boy.svg'
                                  className='h-50 align-self-center'
                                  alt=''
                                />
                              </span>
                            </div>
                          </td>
                          <td className='pl-0'>
                            <h1 className='text-dark font-weight-bolder mb-0 font-size-lg'>
                              {/* Injamamul Haque */}
                              {user.username || ''}
                            </h1>
                          </td>
                          <td className='text-center'>
                            <span className='text-muted font-weight-bold d-block'>
                              {this.groupIdToName(user.groups[0])}
                            </span>
                          </td>
                          <td className='text-right'>
                            {user_id === user.id ? (
                              <button
                                disabled
                                className='btn label label-lg label-light-success label-inline'
                              >
                                Edit
                              </button>
                            ) : (
                              <Link
                                to={`/user/${user.id}`}
                                className='btn label label-lg label-light-success label-inline'
                              >
                                Edit
                              </Link>
                            )}
                          </td>
                          <td className='text-right'>
                            {user_id === user.id ? (
                              <button
                                disabled
                                className='btn label label-lg label-light-danger label-inline'
                              >
                                Delete
                              </button>
                            ) : (
                              <button
                                onClick={() => this.deleteUser(user)}
                                className='btn label label-lg label-light-danger label-inline'
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    {/* <tr>
                      <td className='py-5 pl-0'>
                        <div className='symbol symbol-50 symbol-light mr-2'>
                          <span className='symbol-label'>
                            <img
                              src='https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/avatars/001-boy.svg'
                              className='h-50 align-self-center'
                              alt=''
                            />
                          </span>
                        </div>
                      </td>
                      <td className='pl-0'>
                        <h1 className='text-dark font-weight-bolder mb-0 font-size-lg'>
                          Injamamul Haque
                        </h1>
                      </td>
                      <td className='text-right'>
                        <span className='text-muted font-weight-bold d-block'>
                          Order Manager
                        </span>
                      </td>
                      <td className='text-right'>
                        <button className='btn label label-lg label-light-success label-inline'>
                          Edit
                        </button>
                      </td>
                      <td className='text-right'>
                        <button className='btn label label-lg label-light-danger label-inline'>
                          Delete
                        </button>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
