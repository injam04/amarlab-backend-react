import axios from 'axios';
import React, { Component } from 'react';
import OrderTable from '../components/OrderTable';
import OrderAddModal from '../components/OrderAddModal';
import moment from 'moment';

class Orders extends Component {
  state = {
    orders: [],
    orderCount: null,
    next: null,
    offset: 2,
    limit: 2,
    users: null,
    showAddModal: false,
    allAccess: false,
    rolePaginate: null,
    roleId: null,
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
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?page=1&limit=2&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  fetchUserOrders = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?user=${id}&page=1&limit=2&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  fetchMtOrders = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?orderdetail__mt=${id}&page=1&limit=2&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
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
      if (userRole.groups.length === 0) {
        // console.log('User');
        this.fetchUserOrders(userRole.id);
        this.setState({ rolePaginate: 'user' });
        this.setState({ roleId: userRole.id });
      } else if (userRole.groups[0].name === 'User') {
        // console.log('User');
        this.fetchUserOrders(userRole.id);
        this.setState({ rolePaginate: 'user' });
        this.setState({ roleId: userRole.id });
      } else if (userRole.groups[0].name === 'Medical Technologist') {
        // console.log('Medical Technologist');
        this.fetchMtOrders(userRole.id);
        this.setState({ rolePaginate: 'mt' });
        this.setState({ roleId: userRole.id });
      } else {
        // console.log('Show all');
        this.setState({ allAccess: true });
        this.fetchOrders();
        this.fetchUsers();
      }
    }
  }

  loadMore = () => {
    this.setState({ offset: this.state.offset + 2 });

    let params = new URLSearchParams(this.props.location.search);
    let status = params.get('status');
    let date = params.get('date');

    if (status) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?orderdetail__order_status=${status}&limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            orders: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    } else if (date) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?date=${date}&limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            orders: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    } else if (this.state.rolePaginate === 'user') {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?user=${this.state.roleId}&limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            orders: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    } else if (this.state.rolePaginate === 'mt') {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/order/order-tree/?orderdetail__mt=${this.state.roleId}&limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
        )
        .then((resp) => {
          // console.log(resp.data);
          this.setState({
            orders: [...this.state.orders, ...resp.data.results],
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
            orders: [...this.state.orders, ...resp.data.results],
          });
          this.setState({ next: resp.data.next });
        });
    }
  };

  filterByStatus = (value) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?orderdetail__order_status=${value}&page=1&limit=2&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ orders: [] });
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  handleByStatus = (e) => {
    // console.log(e.target.value);
    this.setState({ offset: 2 });
    if (e.target.value === '') {
      this.props.history.push(`/orders`);
      this.fetchOrders();
    } else {
      // console.log('show filter');
      this.props.history.push(`/orders?status=${e.target.value}`);
      this.filterByStatus(e.target.value);
    }
  };

  filterByDay = (value) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?date=${value}&page=1&limit=2&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ orders: [] });
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  handleByDay = (e) => {
    // console.log(e.target.value);
    this.setState({ offset: 2 });

    if (e.target.value === '') {
      this.props.history.push(`/orders`);
      this.fetchOrders();
    } else {
      this.props.history.push(`/orders?date=${e.target.value}`);
      this.filterByDay(e.target.value);
    }
  };

  setShowAddModal = (value) => {
    this.setState({ showAddModal: value });
    this.fetchOrders();
  };

  render() {
    const { orders, orderCount, next, users, showAddModal, allAccess } =
      this.state;

    return (
      <>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card card-custom card-stretch gutter-b'>
              <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label font-weight-bolder text-dark'>
                    All Orders
                  </span>
                  <span className='text-muted mt-3 font-weight-bold font-size-sm'>
                    Total orders {orderCount || 0}
                  </span>
                </h3>
                {allAccess && (
                  <div className='card-toolbar'>
                    <button
                      onClick={(e) => this.setShowAddModal(e, true)}
                      className='btn btn-primary'
                    >
                      Add Order
                    </button>
                  </div>
                )}
              </div>
              <div className='card-body pt-2 pb-0 mt-n3'>
                {allAccess && (
                  <div className='row pt-4'>
                    <div className='col-md-6'>
                      <select
                        className='form-control'
                        onChange={this.handleByStatus}
                      >
                        <option value=''>Filter by Status</option>
                        <option value='processing'>Processing</option>
                        <option value='confirmed'>Confirmed</option>
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <select
                        className='form-control'
                        onChange={this.handleByDay}
                      >
                        <option value=''>Filter by Order Day</option>
                        <option value={moment(new Date()).format('YYYY-MM-DD')}>
                          Today
                        </option>
                        <option value=''>All</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className='row'>
                  <div className='col-md-12 order-history'>
                    <div className='table-responsive'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th className='pl-5 py-4 min-w-100px'>#ID</th>
                            <th className='pl-5 py-4 min-w-150px'>User</th>
                            <th className='py-4 min-w-130px'>Date & Time</th>
                            <th className='py-4 min-w-130px'>Order Status</th>
                            <th className='py-4 min-w-130px'>CS Agent</th>
                            <th className='py-4 min-w-110px'>MT</th>
                            <th className='py-4 min-w-110px'>Type</th>
                            <th className='py-4 min-w-130px'>Reference</th>
                            {/* <th className='py-4 min-w-180px'>Patient Info</th> */}
                            <th className='py-4 min-w-110px'>Persona</th>
                            <th className='py-4 min-w-170px'>Contact</th>
                            <th className='py-4 min-w-150px'>Area</th>
                            <th className='py-4 min-w-250px'>Order Details</th>
                            <th className='py-4 min-w-150px'>
                              Sample Collection
                            </th>
                            <th className='py-4 min-w-130px'>Cart Value</th>
                            <th className='py-4 min-w-150px'>Discount</th>
                            <th className='py-4 min-w-150px'>Total Payment</th>
                            <th className='py-4 min-w-150px'>Payment Status</th>
                            <th className='py-4 min-w-180px'>Order Note</th>
                            <th className='py-4 min-w-180px'>
                              Report Delivery
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders.map((order, i) => (
                              <OrderTable
                                key={i}
                                order={order}
                                allAccess={allAccess}
                              />
                            ))}
                          {/* <OrderTable /> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='col-12 mb-10'>
                    <p className='m-0 text-center'>
                      <button
                        className='btn btn-primary btn-lg'
                        onClick={this.loadMore}
                        disabled={next ? '' : 'disabled'}
                      >
                        See More
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OrderAddModal
          showAddModal={showAddModal}
          setShowAddModal={this.setShowAddModal}
        />
      </>
    );
  }
}

export default Orders;
