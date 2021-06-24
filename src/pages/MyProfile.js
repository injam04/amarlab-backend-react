import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

class MyProfile extends Component {
  state = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    username: '',
    newPassword: '',
    isEditable: false,
  };

  fetchUsers = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_management/user/${id}`)
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ first_name: resp.data.first_name });
        this.setState({ last_name: resp.data.last_name });
        this.setState({ email: resp.data.email });
        this.setState({ username: resp.data.username });
        this.setState({ password: resp.data.password });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.first_name.trim() === '') {
      toast.error(`Firstname can not be empty.`, {
        autoClose: 3000,
      });
    } else if (this.state.last_name.trim() === '') {
      toast.error(`Lastname can not be empty.`, {
        autoClose: 3000,
      });
    } else {
      const user_details = localStorage.getItem('user_details');
      const user = JSON.parse(user_details);
      const id = user.pk;

      const ajaxPut = (data) => {
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/user_management/user/${id}/`,
            data
          )
          .then((resp) => {
            // console.log(resp.data);
            toast.success(`Profile updated successfully.`, {
              autoClose: 3000,
            });
            this.props.history.push('/');
          })
          .catch((error) => console.log(error.response));
      };

      if (this.state.newPassword.trim() === '') {
        const putData = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          password: this.state.password,
        };
        // console.log(putData);
        ajaxPut(putData);
      } else {
        const putData = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.newPassword,
          username: this.state.username,
        };
        // console.log(putData);
        ajaxPut(putData);
      }
    }
  };

  componentDidMount() {
    const user_details = localStorage.getItem('user_details');
    if (user_details) {
      const user = JSON.parse(user_details);
      this.fetchUsers(user.pk);
    } else {
      console.log('Logout');
    }
  }

  render() {
    const { first_name, last_name, email, newPassword, isEditable, username } =
      this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card py-8 px-8 py-lg-15 px-lg-10'>
            <div className='row justify-content-center'>
              <div className='col-xl-9'>
                <div className='d-flex justify-content-between align-items-center'>
                  <h5 className='text-dark font-weight-bold mb-10'>
                    My Profile
                  </h5>
                  <button
                    className='btn btn-primary'
                    onClick={() => this.setState({ isEditable: !isEditable })}
                  >
                    Edit
                  </button>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Username
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='text'
                        value={username}
                        disabled
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
                        disabled={isEditable ? '' : 'disabled'}
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
                        disabled={isEditable ? '' : 'disabled'}
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
                        disabled
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='form-group row fv-plugins-icon-container'>
                    <label className='col-xl-3 col-lg-3 col-form-label'>
                      Update Password
                    </label>
                    <div className='col-lg-9 col-xl-9'>
                      <input
                        className='form-control form-control-solid form-control-lg'
                        type='text'
                        value={newPassword}
                        onChange={(e) =>
                          this.setState({ newPassword: e.target.value })
                        }
                        disabled={isEditable ? '' : 'disabled'}
                      />
                      <div className='fv-plugins-message-container' />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between border-top pt-10 mt-15'>
                    <div className='mr-2'></div>
                    <div>
                      <button
                        disabled={isEditable ? '' : 'disabled'}
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

export default MyProfile;
