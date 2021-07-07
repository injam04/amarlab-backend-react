import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class AddUser extends Component {
  state = {
    group: [],
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    user_group: '',
    is_active: true,
    is_superuser: false,
  };

  fetchGroup = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_management/group/`)
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ group: resp.data.results });
      });
  };

  componentDidMount() {
    const user_details = localStorage.getItem('user_details');
    const userRole = JSON.parse(user_details);
    if (userRole.groups[0].name !== 'Admin') {
      this.props.history.push('/order');
    } else {
      this.fetchGroup();
    }
  }

  handleRole = (e) => {
    // console.log(e.target.value);
    this.setState({ user_group: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let numberPattern = /^01\d{9}$/;
    if (!numberPattern.test(this.state.username)) {
      toast.error(`Please enter a valid phone number.`, {
        autoClose: 3000,
      });
    } else if (this.state.password.trim() === '') {
      toast.error(`Please enter a password.`, {
        autoClose: 3000,
      });
    } else if (this.state.user_group === '') {
      toast.error(`Please select a role.`, {
        autoClose: 3000,
      });
    } else {
      const strToInt = parseInt(this.state.user_group);

      const postUser = {
        email: this.state.email,
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        is_staff: true,
        is_active: this.state.is_active,
        is_superuser: this.state.user_group === '1' ? true : false,
        password: this.state.password,
        groups: [strToInt],
      };

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user_management/user/`,
          postUser
        )
        .then((resp) => {
          // console.log(resp.data);

          const postPatient = {
            is_account: true,
            user: resp.data.id,
            full_name: `${resp.data.first_name} ${resp.data.last_name}`,
            email: resp.data.email,
          };

          axios
            .post(
              `${process.env.REACT_APP_BASE_URL}/user_management/patient/`,
              postPatient
            )
            .then((resp) => {
              toast.success(`User added successfully.`, {
                autoClose: 3000,
              });
              this.props.history.push('/users');
            });
        })
        .catch((error) => {
          // console.log(error.response);
          if (error.response.status === 400) {
            if (error.response.data.username) {
              toast.error(`${error.response.data.username}`, {
                autoClose: 3000,
              });
            } else if (error.response.data.email) {
              toast.error(`${error.response.data.email}`, {
                autoClose: 3000,
              });
            } else if (error.response.data.password) {
              toast.error(`${error.response.data.password}`, {
                autoClose: 3000,
              });
            } else {
              toast.error(
                'Sorry something went wrong, please try again later.',
                {
                  autoClose: 3000,
                }
              );
            }
          } else {
            toast.error('Sorry something went wrong, please try again later.', {
              autoClose: 3000,
            });
          }
        });

      // console.log(postUser);
    }
  };

  render() {
    const {
      group,
      email,
      username,
      first_name,
      last_name,
      password,
      is_active,
    } = this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card py-8 px-8 py-lg-15 px-lg-10'>
            <div className='row justify-content-center'>
              <div className='col-xl-9'>
                <h5 className='text-dark font-weight-bold mb-10'>
                  User's Details:
                </h5>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Phone Number
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='text'
                        value={username}
                        onChange={(e) =>
                          this.setState({ username: e.target.value })
                        }
                        placeholder='01XXXXXX'
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      First Name
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='text'
                        value={first_name}
                        onChange={(e) =>
                          this.setState({ first_name: e.target.value })
                        }
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Last Name
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='text'
                        value={last_name}
                        onChange={(e) =>
                          this.setState({ last_name: e.target.value })
                        }
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Email
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='email'
                        value={email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Password
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='text'
                        value={password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Role
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <select
                        className='form-control form-control-solid form-control-lg'
                        // value={user_group || ''}
                        onChange={this.handleRole}
                      >
                        <option value=''>User Role</option>
                        {group.length !== 0 &&
                          group.map((group, i) => (
                            <option key={i} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label checkbox checkbox-success'>
                      Is Active
                    </label>
                    <div className='col-lg-9 col-xl-9 d-flex align-items-center'>
                      <input
                        type='checkbox'
                        name='is_active'
                        onChange={() =>
                          this.setState({ is_active: !this.state.is_active })
                        }
                        defaultChecked={is_active}
                      />
                    </div>
                  </div>
                  {/* <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label checkbox checkbox-success'>
                      Is Super
                    </label>
                    <div className='col-lg-9 col-xl-9 d-flex align-items-center'>
                      <input
                        type='checkbox'
                        name='is_super'
                        defaultChecked={is_superuser}
                        onChange={() =>
                          this.setState({
                            is_superuser: !this.state.is_superuser,
                          })
                        }
                      />
                    </div>
                  </div> */}
                  <div className='d-flex justify-content-end border-top pt-10 mt-15'>
                    <div>
                      <Link
                        to='/users'
                        type='submit'
                        className='btn btn-success font-weight-bolder px-9 py-4 mr-3'
                      >
                        Go Back
                      </Link>
                    </div>
                    <div>
                      <button
                        type='submit'
                        className='btn btn-primary font-weight-bolder px-9 py-4'
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
