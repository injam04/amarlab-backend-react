import axios from 'axios';
import React, { Component } from 'react';

class Orders extends Component {
  state = {
    orders: [],
  };

  fetchOrders = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order/?page=1&limit=10&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data);
        this.setState({ orders: resp.data.results });
      });
  };

  componentDidMount() {
    this.fetchOrders();
  }

  render() {
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
                  More than 0+ orders
                </span>
              </h3>
            </div>
            <div className='card-body pt-2 pb-0 mt-n3'>
              <div className='table-responsive'>
                <table className='table table-borderless table-vertical-center'>
                  <thead>
                    <tr>
                      <th className='p-0 w-50px'></th>
                      <th className='p-0 min-w-150px'></th>
                      <th className='p-0 min-w-140px'></th>
                      <th className='p-0 min-w-110px'></th>
                      <th className='p-0 min-w-50px'></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='py-5 pl-0'>
                        <div className='symbol symbol-50 symbol-light mr-2'>
                          <span className='symbol-label'>
                            <img
                              src='https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/avatars/001-boy.svg'
                              className='h-50 align-self-center'
                              alt=''
                            />
                          </span>
                        </div>
                      </td>
                      <td className='pl-0'>
                        <h1 className='text-dark font-weight-bolder mb-0 font-size-lg'>
                          Injamamul Haque
                        </h1>
                      </td>
                      <td className='text-right'>
                        <span className='text-muted font-weight-bold d-block'>
                          Order Manager
                        </span>
                      </td>
                      <td className='text-right'>
                        <button className='btn label label-lg label-light-success label-inline'>
                          Edit
                        </button>
                      </td>
                      <td className='text-right'>
                        <button className='btn label label-lg label-light-danger label-inline'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
