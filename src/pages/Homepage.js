import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import RevenueSvg from '../assets/img/revenue.svg';
import UserSvg from '../assets/img/user.svg';
import OrderSvg from '../assets/img/ordsvg.svg';

class Homepage extends Component {
  state = {
    totalOrder: null,
    totalPatient: null,
    totalRevenue: null,
    total: null,
  };

  fetchTotal = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order/order-summery`)
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ total: resp.data });
      });
  };

  fetchToday = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/order/order-summery`, {
        start: '2021-06-25',
        end: '2021-07-01',
      })
      .then((resp) => {
        console.log(resp.data);
        // this.setState({ total: resp.data });
      })
      .catch((error) => {
        console.log(error.response);
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
      this.fetchTotal();
      this.fetchPatients();
      this.fetchToday();
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
    const { totalOrder, totalPatient, totalRevenue, total } = this.state;

    return (
      <div className='row homepage'>
        <div className='col-md-12'>
          <div className='card card-custom card-stretch gutter-b py-5 px-2'>
            <div className='card-body'>
              <div className='row all'>
                <div className='col-md-4'>
                  <div className='col bg-light-danger p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-danger d-block my-2'>
                      <img src={OrderSvg} alt='' />
                    </span>
                    <p className='text-danger font-weight-bold font-size-h3 mb-1'>
                      Total Orders
                    </p>
                    <p className='text-danger font-weight-bold font-size-h6'>
                      {total ? `${this.addZero(total.order)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-success p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-success d-block my-2'>
                      <img src={UserSvg} alt='' />
                    </span>
                    <p className='text-success font-weight-bold font-size-h3 mb-1'>
                      Total Patients
                    </p>
                    <p className='text-success font-weight-bold font-size-h6'>
                      {total ? `${this.addZero(total.patient)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-warning p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-warning d-block my-2'>
                      <img src={RevenueSvg} alt='' />
                    </span>
                    <p className='text-warning font-weight-bold font-size-h3 mb-1'>
                      Total Revenue (GMV)
                    </p>
                    <p className='text-warning font-weight-bold font-size-h6'>
                      {total ? `${total.price}` : '00.00'}
                    </p>
                  </div>
                </div>
              </div>
              <div className='row today mt-13'>
                <div className='col-md-12 mb-3'>
                  {/* <p className='text-center button'>
                    <button className='btn btn-light'>
                      Todays {`(${moment(new Date()).format('DD MMM YYYY')})`}
                    </button>
                  </p> */}
                  <p className='text-center button'>
                    <span className='card-label font-weight-bold  font-size-h3'>
                      ————— Todays{' '}
                      {`(${moment(new Date()).format('DD MMM YYYY')})`} —————
                    </span>
                  </p>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-danger p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-danger d-block my-2'>
                      <img src={OrderSvg} alt='' />
                    </span>
                    <p className='text-danger font-weight-bold font-size-h3 mb-1'>
                      Orders
                    </p>
                    <p className='text-danger font-weight-bold font-size-h6'>
                      {totalOrder ? `${this.addZero(totalOrder)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-success p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-success d-block my-2'>
                      <img src={UserSvg} alt='' />
                    </span>
                    <p className='text-success font-weight-bold font-size-h3 mb-1'>
                      Patients
                    </p>
                    <p className='text-success font-weight-bold font-size-h6'>
                      {totalPatient ? `${this.addZero(totalPatient)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-warning p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-warning d-block my-2'>
                      <img src={RevenueSvg} alt='' />
                    </span>
                    <p className='text-warning font-weight-bold font-size-h3 mb-1'>
                      Revenue (GMV)
                    </p>
                    <p className='text-warning font-weight-bold font-size-h6'>
                      {totalRevenue ? `${totalRevenue}.00` : '00.00'}
                    </p>
                  </div>
                </div>
              </div>
              <div className='row today mt-13'>
                <div className='col-md-12 mb-3'>
                  {/* <p className='text-center button'>
                    <button className='btn btn-light'>Weekly</button>
                  </p> */}
                  <p className='text-center button'>
                    <span className='card-label font-weight-bold  font-size-h3'>
                      ————————— Weekly —————————
                    </span>
                  </p>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-danger p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-danger d-block my-2'>
                      <img src={OrderSvg} alt='' />
                    </span>
                    <p className='text-danger font-weight-bold font-size-h3 mb-1'>
                      Orders
                    </p>
                    <p className='text-danger font-weight-bold font-size-h6'>
                      {totalOrder ? `${this.addZero(totalOrder)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-success p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-success d-block my-2'>
                      <img src={UserSvg} alt='' />
                    </span>
                    <p className='text-success font-weight-bold font-size-h3 mb-1'>
                      Patients
                    </p>
                    <p className='text-success font-weight-bold font-size-h6'>
                      {totalPatient ? `${this.addZero(totalPatient)}` : '00'}
                    </p>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='col bg-light-warning p-8 rounded-xl'>
                    <span className='svg-icon svg-icon-3x svg-icon-warning d-block my-2'>
                      <img src={RevenueSvg} alt='' />
                    </span>
                    <p className='text-warning font-weight-bold font-size-h3 mb-1'>
                      Revenue (GMV)
                    </p>
                    <p className='text-warning font-weight-bold font-size-h6'>
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
