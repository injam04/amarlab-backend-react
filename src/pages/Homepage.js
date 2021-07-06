import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import RevenueSvg from '../assets/img/revenue.svg';
import UserSvg from '../assets/img/user.svg';
import OrderSvg from '../assets/img/ordsvg.svg';

class Homepage extends Component {
  state = {
    today: moment().add(1, 'days').format('YYYY-MM-DD'),
    yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    week: moment().subtract(6, 'days').format('YYYY-MM-DD'),
    subTotal: null,
    todayTotal: null,
    weekTotal: null,
  };

  fetchTotal = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order/order-summery`)
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ subTotal: resp.data });
      });
  };

  fetchToday = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-summery/${this.state.yesterday}/${this.state.today}`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ todayTotal: resp.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  fetchWeek = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-summery/${this.state.week}/${this.state.today}`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ weekTotal: resp.data });
      })
      .catch((error) => {
        console.log(error.response);
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
      this.fetchToday();
      this.fetchWeek();
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
    const { subTotal, todayTotal, weekTotal } = this.state;

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
                      {subTotal ? `${this.addZero(subTotal.order)}` : '00'}
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
                      {subTotal ? `${this.addZero(subTotal.patient)}` : '00'}
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
                      {subTotal ? `${subTotal.price}` : '00.00'}
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
                      {todayTotal ? `${this.addZero(todayTotal.order)}` : '00'}
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
                      {todayTotal
                        ? `${this.addZero(todayTotal.patient)}`
                        : '00'}
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
                      {todayTotal ? `${todayTotal.price}` : '00.00'}
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
                      {weekTotal ? `${this.addZero(weekTotal.order)}` : '00'}
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
                      {weekTotal ? `${this.addZero(weekTotal.patient)}` : '00'}
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
                      {weekTotal ? `${weekTotal.price}` : '00.00'}
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
