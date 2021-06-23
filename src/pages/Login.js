import React, { Component } from 'react';
import { toast } from 'react-toastify';
import background from '../assets/img/login-bg.jpg';
import amarlabLogo from '../assets/img/logo.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = (e) => {
    e.preventDefault();

    if (this.state.email.trim() === '') {
      toast.error('Please enter email!', {
        autoClose: 3000,
      });
    } else if (this.state.password.trim() === '') {
      toast.error('Please enter password!', {
        autoClose: 3000,
      });
    } else {
      const postLogin = {
        username: this.state.email,
        password: this.state.password,
      };

      console.log(postLogin);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <section className='login_page'>
        <div className='d-flex flex-column flex-root height'>
          <div
            className='login login-4 login-signin-on d-flex flex-row-fluid'
            id='kt_login'
          >
            <div
              className='d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat'
              style={{
                backgroundImage: `url(${background})`,
              }}
            >
              <div className='login-form text-center p-7 position-relative overflow-hidden'>
                <div className='d-flex flex-center mb-15'>
                  <a
                    href='https://amarlab.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={amarlabLogo} className='max-h-75px' alt='' />
                  </a>
                </div>
                <div className='login-signin'>
                  <div className='mb-20'>
                    <h3>Admin Login AmarLab</h3>
                    <div className='text-muted font-weight-bold'>
                      Enter your details to login to your account:
                    </div>
                  </div>
                  <form
                    className='form'
                    id='kt_login_signin_form'
                    onSubmit={this.handleLogin}
                  >
                    <div className='form-group mb-5'>
                      <input
                        className='form-control h-auto form-control-solid py-4 px-8'
                        type='text'
                        placeholder='Email'
                        name='username'
                        autoComplete='off'
                        value={email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                    <div className='form-group mb-5'>
                      <input
                        className='form-control h-auto form-control-solid py-4 px-8'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                    <button
                      id='kt_login_signin_submit'
                      className='btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4'
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
