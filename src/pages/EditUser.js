import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class EditUser extends Component {
  state = {
    group: [],
    userId: null,
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    username: '',
    user_group: '',
    is_active: false,
    newPassword: '',
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
    const token = localStorage.getItem('token');
    const user_details = localStorage.getItem('user_details');
    if (!token) {
      this.props.history.push('/login');
    } else {
      axios.interceptors.request.use((config) => {
        const tokehjjhhn = 'Token ' + JSON.parse(token);
        config.headers.Authorization = tokehjjhhn;
        return config;
      });

      const userRole = JSON.parse(user_details);
      // const checkGroup = userRole.groups.length === 0 ? 'no group' : 'group';
      // console.log(checkGroup);
      if (userRole.groups.length === 0) {
        this.props.history.push('/orders');
      } else if (userRole.groups[0].name !== 'Admin') {
        this.props.history.push('/orders');
      } else {
        this.fetchGroup();
        const params = this.props.match.params.id;

        if (params) {
          axios
            .get(
              `${process.env.REACT_APP_BASE_URL}/user_management/user/${params}`
            )
            .then((resp) => {
              // console.log(resp.data);
              this.setState({ first_name: resp.data.first_name });
              this.setState({ last_name: resp.data.last_name });
              this.setState({ email: resp.data.email });
              this.setState({
                user_group:
                  resp.data.groups.length !== 0 ? resp.data.groups[0] : '',
              });
              this.setState({ is_active: resp.data.is_active });
              this.setState({ userId: resp.data.id });
              this.setState({ username: resp.data.username });
              this.setState({ password: resp.data.password });
            })
            .catch((error) => {
              // console.log(error.response);
              if (error.response.status === 404) {
                this.props.history.push('/users');
              }
            });
        }
      }
    }
  }

  handleRole = (e) => {
    // console.log(e.target.value);
    this.setState({ user_group: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const ajaxPut = (data) => {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/user_management/user/${this.state.userId}/`,
          data
        )
        .then((resp) => {
          // console.log(resp.data);
          toast.success(`User profile updated successfully.`, {
            autoClose: 3000,
          });
          this.props.history.push('/users');
        })
        .catch((error) => console.log(error.response));
    };

    let strToInt;
    const typeCheck = typeof this.state.user_group;
    if (typeCheck === 'string') {
      strToInt = parseInt(this.state.user_group);
    } else {
      strToInt = this.state.user_group;
    }

    if (this.state.newPassword.trim() !== '') {
      const putUser = {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        is_staff: true,
        is_active: this.state.is_active,
        is_superuser: strToInt === 1 ? true : false,
        password: this.state.newPassword,
        groups: [strToInt],
      };

      // console.log(putUser);
      ajaxPut(putUser);
    } else {
      const putUser = {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        is_staff: true,
        is_active: this.state.is_active,
        is_superuser: strToInt === 1 ? true : false,
        password: this.state.password,
        groups: [strToInt],
      };

      // console.log(putUser);
      ajaxPut(putUser);
    }
  };

  render() {
    // console.log(this.props.match.params.id);
    const {
      group,
      email,
      first_name,
      last_name,
      is_active,
      user_group,
      username,
      newPassword,
    } = this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card py-8 px-8 py-lg-15 px-lg-10'>
            <div className='row justify-content-center'>
              <div className='col-xl-9'>
                <h5 className='text-dark font-weight-bold mb-10'>
                  Edit User :
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
                        value={newPassword}
                        onChange={(e) =>
                          this.setState({ newPassword: e.target.value })
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
                        value={user_group || ''}
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
                        checked={is_active}
                      />
                    </div>
                  </div>
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

export default EditUser;
