import axios from 'axios';
import React, { Component } from 'react';
import OrderTable from '../components/OrderTable';
import OrderAddModal from '../components/OrderAddModal';

class Orders extends Component {
  state = {
    orders: [],
    orderCount: null,
    next: null,
    offset: 2,
    limit: 2,
    users: null,
    showAddModal: false,
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
        console.log(resp.data.results);
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
    this.setState({ offset: this.state.offset + 2 });

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
            orders: [...this.state.orders, ...resp.data.results],
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

  setShowAddModal = (value) => {
    this.setState({ showAddModal: value });
    this.fetchOrders();
  };

  render() {
    const { orders, orderCount, next, users, showAddModal } = this.state;

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
                <div className='card-toolbar'>
                  <button
                    onClick={(e) => this.setShowAddModal(e, true)}
                    className='btn btn-primary'
                  >
                    Add Order
                  </button>
                </div>
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
                    <select
                      className='form-control'
                      onChange={this.handleByUser}
                    >
                      <option value=''>Filter by Day</option>
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
                              <OrderTable key={i} order={order} />
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
