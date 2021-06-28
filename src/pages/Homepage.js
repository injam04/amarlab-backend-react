import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';

class Homepage extends Component {
  state = {
    totalOrder: null,
    totalPatient: null,
    totalRevenue: null,
  };

  fetchOrders = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/order/order/`).then((resp) => {
      this.setState({ totalOrder: resp.data.count });
      const orders = resp.data.results;
      const totalPrice = orders
        .map((order) => {
          return parseInt(order.total_price);
        })
        .reduce((total, price) => {
          return total + price;
        }, 0);
      // console.log(totalPrice);
      this.setState({ totalRevenue: totalPrice });
    });
  };

  fetchPatients = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/patient/?page=1&limit=1&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ totalPatient: resp.data.count });
      });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      axios.interceptors.request.use((config) => {
        const tokehjjhhn = 'Token ' + JSON.parse(token);
        config.headers.Authorization = tokehjjhhn;
        return config;
      });
      this.fetchOrders();
      this.fetchPatients();
    }
  }

  addZero = (string) => {
    if (string < 10) {
      return `0${string}`;
    } else {
      return string;
    }
  };

  render() {
    const { totalOrder, totalPatient, totalRevenue } = this.state;

    return (
      <div className='row homepage'>
        <div className='col-md-12'>
          <div className='card card-custom card-stretch gutter-b py-5 px-2'>
            <div className='card-body'>
              <div className='row all'>
                <div className='col-md-4'>
                  <div className='single bg-light-danger'>
                    <span className='svg-icon svg-icon-3x svg-icon-danger d-block my-2'></span>
                    <h1 className='text-danger'>Total Orders</h1>
                    <p className='text-danger'>
                      {totalOrder ? `${this.addZero(totalOrder)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-success'>
                    <h1 className='text-success'>Total Patients</h1>
                    <p className='text-success'>
                      {totalPatient ? `${this.addZero(totalPatient)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-warning'>
                    <h1 className='text-warning'>Total Revenue (GMV)</h1>
                    <p className='text-warning'>
                      {totalRevenue ? `${totalRevenue}.00` : '00.00'}
                    </p>
                  </div>
                </div>
              </div>
              <div className='row today mt-13'>
                <div className='col-md-12 mb-3'>
                  <p className='text-center button'>
                    <button className='btn btn-light'>
                      Todays {`(${moment(new Date()).format('DD MMM YYYY')})`}
                    </button>
                  </p>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-danger'>
                    <h1 className='text-danger'>Orders</h1>
                    <p className='text-danger'>
                      {totalOrder ? `${this.addZero(totalOrder)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-success'>
                    <h1 className='text-success'>Patients</h1>
                    <p className='text-success'>
                      {totalPatient ? `${this.addZero(totalPatient)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-warning'>
                    <h1 className='text-warning'>Revenue (GMV)</h1>
                    <p className='text-warning'>
                      {totalRevenue ? `${totalRevenue}.00` : '00.00'}
                    </p>
                  </div>
                </div>
              </div>
              <div className='row today mt-13'>
                <div className='col-md-12 mb-3'>
                  <p className='text-center button'>
                    <button className='btn btn-light'>Weekly</button>
                  </p>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-danger'>
                    <h1 className='text-danger'>Orders</h1>
                    <p className='text-danger'>
                      {totalOrder ? `${this.addZero(totalOrder)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-success'>
                    <h1 className='text-success'>Patients</h1>
                    <p className='text-success'>
                      {totalPatient ? `${this.addZero(totalPatient)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='single bg-light-warning'>
                    <h1 className='text-warning'>Revenue (GMV)</h1>
                    <p className='text-warning'>
                      {totalRevenue ? `${totalRevenue}.00` : '00.00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
