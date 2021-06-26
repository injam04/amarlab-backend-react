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
  };

  fetchOrders = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?page=1&limit=8&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ orders: resp.data.results });
        this.setState({ orderCount: resp.data.count });
        this.setState({ next: resp.data.next });
      });
  };

  componentDidMount() {
    this.fetchOrders();
  }

  loadMore = () => {
    this.setState({ offset: this.state.offset + 8 });

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-tree/?limit=${this.state.limit}&offset=${this.state.offset}&ofset=0&page=1`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ users: [...this.state.orders, ...resp.data.results] });
        this.setState({ next: resp.data.next });
      });
  };

  render() {
    const { orders, orderCount, next } = this.state;

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
                  More than {orderCount || ''}+ orders
                </span>
              </h3>
            </div>
            <div className='card-body pt-2 pb-0 mt-n3'>
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
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
