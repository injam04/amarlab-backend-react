import React, { Component } from 'react';

class Homepage extends Component {
  state = {};

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h1>Homepage</h1>
        </div>
      </div>
    );
  }
}

export default Homepage;
