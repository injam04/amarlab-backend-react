import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Orders extends Component {
  state = {
    orders: [],
    orderCount: null,
    next: null,
    offset: 8,
    limit: 8,
    users: null,
  };

  fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_management/user/`)
      .then((resp) => {
        this.setState({ users: resp.data.results });
        // console.log(resp.data.results);
      });
  };

  fetchOrders = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?page=1&limit=8&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  componentDidMount() {
    this.fetchOrders();
    this.fetchUsers();
  }

  loadMore = () => {
    this.setState({ offset: this.state.offset + 8 });

    let params = new URLSearchParams(this.props.location.search);
    let status = params.get('status');
    let user = params.get('user');

    if (status) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?status=${status}&limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            users: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    } else if (user) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?user=${user}&limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            users: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            users: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    }
  };

  filterByStatus = (value) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?status=${value}&page=1&limit=8&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  handleByStatus = (e) => {
    // console.log(e.target.value);
    this.setState({ offset: 8 });
    if (e.target.value === '') {
      this.props.history.push(`/orders`);
      this.fetchOrders();
    } else {
      // console.log('show filter');
      this.props.history.push(`/orders?status=${e.target.value}`);
      this.filterByStatus(e.target.value);
    }
  };

  filterByUser = (value) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?user=${value}&page=1&limit=8&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  handleByUser = (e) => {
    // console.log(e.target.value);
    this.setState({ offset: 8 });

    if (e.target.value === '') {
      this.props.history.push(`/orders`);
      this.fetchOrders();
    } else {
      this.props.history.push(`/orders?user=${e.target.value}`);
      this.filterByUser(e.target.value);
    }
  };

  render() {
    const { orders, orderCount, next, users } = this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-custom card-stretch gutter-b'>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label font-weight-bolder text-dark'>
                  All Orders
                </span>
                <span className='text-muted mt-3 font-weight-bold font-size-sm'>
                  More than {orderCount || 0}+ orders
                </span>
              </h3>
            </div>
            <div className='card-body pt-2 pb-0 mt-n3'>
              <div className='row pt-4'>
                <div className='col-md-6'>
                  <select
                    className='form-control'
                    onChange={this.handleByStatus}
                  >
                    <option value=''>Filter by Status</option>
                    <option value='order_confirmed'>Order Confirmed</option>
                    <option value='sample_collected'>Sample Collected</option>
                    <option value='report_delivered'>Report Delivered</option>
                    <option value='due_report'>Due Report</option>
                  </select>
                </div>
                <div className='col-md-6'>
                  <select className='form-control' onChange={this.handleByUser}>
                    <option value=''>Filter by User</option>
                    {users &&
                      users.map((user, i) => (
                        <option value={user.id} key={i}>
                          {user.username}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 order-history'>
                  {orders.length !== 0 &&
                    orders.map((order, i) => (
                      <div className='single' key={i}>
                        <div className='header'>
                          <div className='left'>
                            <p className='id'># {order.id}</p>
                            {/* <p className='date'>01 Feb 2021; 2:17 PM</p> */}
                            <p className='date'>
                              {/* {order.created_at} */}
                              {moment(order.created_at).format(
                                'DD MMM YYYY; hh:mm A'
                              )}
                            </p>
                            <p className='mb-0'>Status: {order.status}</p>
                          </div>
                          <div className='right'>
                            <p>
                              {/* ৳ 8500 */}
                              <span className='text-primary'>
                                ৳ {order.total_price}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className='footer'>
                          <p className='left'>
                            <span>Test Collect Date:</span>{' '}
                            {moment(order.date).format('DD MMM YYYY')}
                          </p>
                          <div className='right'>
                            <Link
                              to={`/order/${order.id}`}
                              className='btn btn-primary'
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  {orders.length === 0 && <h2>Sorry, No orders found.</h2>}
                </div>
                {orders.length !== 0 && (
                  <div className='col-md-12'>
                    <p className='text-center mb-15'>
                      <button
                        className='btn btn-primary btn-lg mb-0'
                        disabled={next ? '' : 'disabled'}
                        onClick={this.loadMore}
                      >
                        SHow More
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
