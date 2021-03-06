import axios from 'axios';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import warningLogo from '../assets/img/warning.svg';

class Users extends Component {
  state = {
    users: [],
    user_id: null,
    group: [],
    showModal: false,
    deleteId: null,
    next: null,
    offset: 10,
    limit: 10,
  };

  fetchUsers = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/?page=1&limit=10&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ users: resp.data.results });
        this.setState({ next: resp.data.next });
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
    const user_details = localStorage.getItem('user_details');
    if (user_details) {
      const user = JSON.parse(user_details);
      this.setState({ user_id: user.id });
    }
  }

  deleteUser = (user) => {
    // console.log(user.id);

    this.setState({ showModal: !this.state.showModal });
    this.setState({ deleteId: user.id });

    // axios
    //   .delete(
    //     `${process.env.REACT_APP_BASE_URL}/user_management/user/${user.id}/`
    //   )
    //   .then((resp) => {
    //     // console.log(resp.data);
    //     this.setState({
    //       users: this.state.users.filter((use) => use.id !== user.id),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
  };

  handleModalDlt = () => {
    // console.log(this.state.deleteId);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/${this.state.deleteId}/`
      )
      .then((resp) => {
        this.setState({
          users: this.state.users.filter(
            (use) => use.id !== this.state.deleteId
          ),
        });
        this.setState({ showModal: false });
        toast.success(`User deleted successfully.`, {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  loadMore = () => {
    this.setState({ offset: this.state.offset + 10 });

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/?limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ users: [...this.state.users, ...resp.data.results] });
        this.setState({ next: resp.data.next });
      });
  };

  render() {
    const { users, user_id, showModal, next } = this.state;

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
              <p className='text-center mb-15 mt-5'>
                <button
                  className='btn btn-primary btn-sm mb-0'
                  disabled={next ? '' : 'disabled'}
                  onClick={this.loadMore}
                >
                  SHow More
                </button>
              </p>
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={() => this.setState({ showModal: !showModal })}
          animation={false}
          centered
          className='delete_confirmation'
        >
          <div className='modal-body mx-auto'>
            <p className='text-center icon mb-0'>
              <img src={warningLogo} alt='' />
            </p>
            <div className='details'>
              <h5>Are you sure?</h5>
              <p>Once delete, it will be permanently deleted.</p>
            </div>
            <p className='buttons mb-0 text-center'>
              <button
                className='btn btn-primary mr-1'
                onClick={() => this.setState({ showModal: !showModal })}
              >
                No
              </button>
              <button
                className='btn btn-danger ml-1'
                onClick={this.handleModalDlt}
              >
                Yes
              </button>
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Users;
