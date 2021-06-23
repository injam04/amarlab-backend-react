import axios from 'axios';
import React, { Component } from 'react';

class EditUser extends Component {
  state = {
    userId: null,
  };

  componentDidMount() {
    // this.setState({ userId: this.props.match.params.id });
    const params = this.props.match.params.id;

    if (params) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user_management/user/${params}`)
        .then((resp) => {
          console.log(resp.data);
          // this.setState({ first_name: resp.data.first_name });
          // this.setState({ last_name: resp.data.last_name });
          // this.setState({ email: resp.data.email });
          // this.setState({ password: resp.data.password });
        });
    }
  }

  render() {
    // console.log(this.props.match.params.id);
    const { userId } = this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card py-8 px-8 py-lg-15 px-lg-10'>
            <div className='row justify-content-center'>
              <div className='col-xl-9'>
                <h5 className='text-dark font-weight-bold mb-10'>
                  Edit User {userId ? userId : ''} :
                </h5>
                <form></form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
