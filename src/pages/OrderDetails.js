import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SingleCartSummery from '../components/SingleCartSummery';
import moment from 'moment';

class OrderDetails extends Component {
  state = {
    order: null,
  };

  fetchOrder = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      this.props.history.push('/orders');
    } else {
      axios.interceptors.request.use((config) => {
        const tokehjjhhn = 'Token ' + JSON.parse(token);
        config.headers.Authorization = tokehjjhhn;
        return config;
      });

      const params = this.props.match.params.id;
      if (params) {
        // console.log(params);
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/order/order-tree/${params}`)
          .then((resp) => {
            // console.log(resp.data);
            this.setState({ order: resp.data });
          })
          .catch((error) => {
            // console.log(error.response);
            if (error.response.status === 404) {
              this.props.history.push('/orders');
            }
          });
      } else {
        this.props.history.push('/orders');
      }
    }
  };

  componentDidMount() {
    this.fetchOrder();
  }

  render() {
    const { order } = this.state;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-custom card-stretch gutter-b'>
            <div className='card-body pt-10 pb-0 mt-n3 order-place-details details'>
              <div className='row'>
                {order && (
                  <div className='col-lg-12 left'>
                    <div className='d-flex justify-content-between align-items-start'>
                      <h5 className='main-heading'>Order Details</h5>
                      <Link to='/orders' className='btn btn-primary'>
                        Go Back
                      </Link>
                    </div>
                    <p className='id'># {order.id}</p>
                    <p className='date'>
                      <span>Test Collect Date: </span>
                      {moment(order.date).format('DD MMM YYYY')}
                    </p>
                    <div className='location'>
                      <p className='left font-semibold'>
                        Sample Pickup Location:
                      </p>
                      <div className='right'>
                        <p className='top font-20 mb-0'>Dhaka, Mirpur</p>
                        <p className='bottom'>
                          Lotus Kamal Tower Two, Level- 12, Plot: 59 & 61,
                          Gulshan South Avenue.
                        </p>
                      </div>
                    </div>
                    <p className='mobile font-20'>
                      <span className='font-semibold'>Mobile Number:</span> +88
                      01765113131
                    </p>
                    <p className='email font-20'>
                      <span className='font-semibold'>Email:</span>{' '}
                      anupam@amarlab.com
                    </p>
                    <div className='cart-summery'>
                      <h5 className='mb-0 font-20 font-semibold'>
                        Cart Summery
                      </h5>
                    </div>
                    <div className='list summery_cart'>
                      {order.orderitem !== 0 &&
                        order.orderitem.map((singleItem, i) => (
                          <SingleCartSummery key={i} singleItem={singleItem} />
                        ))}
                      {/* <SingleCartSummery /> */}
                    </div>
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

export default OrderDetails;
