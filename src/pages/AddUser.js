import axios from 'axios';
import React, { Component } from 'react';

class AddUser extends Component {
  state = {
    group: [],
    email: '',
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
    this.fetchGroup();
  }

  handleRole = (e) => {
    // console.log(e.target.value);
    this.setState({ user_group: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const postUser = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      is_staff: true,
      is_active: this.state.is_active,
      is_superuser: this.state.user_group === 'Admin' ? true : false,
      password: this.state.password,
      // groups: '',
      groups: [{ name: this.state.user_group }],
      // groups: [this.state.user_group],
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user_management/user/`, postUser)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // console.log(postUser);
    // const group = [{ name: this.state.user_group }];

    // console.log(group);
  };

  render() {
    const { group, email, first_name, last_name, password, is_active } =
      this.state;

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
                            <option key={i} value={group.name}>
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
                  <div className='d-flex justify-content-between border-top pt-10 mt-15'>
                    <div className='mr-2'></div>
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
