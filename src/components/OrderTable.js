import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';

const OrderTable = ({ order }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [users, setUsers] = useState(null);

  const [shownItemName, setShownItemName] = useState('');

  // order details
  // const [csName, setCsName] = useState('');
  // const [csId, setCsId] = useState(null)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/?page=1&limit=1000000&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        setUsers(resp.data.results);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const handleEditModal = (order, name) => {
    setShowEditModal(true);
    console.log(order);
    console.log(name);
    setShownItemName(name);
  };

  return (
    <>
      <tr>
        <td className='py-3 pl-5'>
          <p className='mb-0 font-weight-bold'>#{order.order_id}</p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>{order.user.username}</p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {moment(order.created_at).format('DD MMM YYYY,')}
            <br />
            {moment(order.created_at).format('hh:mm A')}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {order.orderdetail ? (
              <>
                {order.orderdetail.order_status} <br />
                <button
                  onClick={() => handleEditModal(order, 'order_status')}
                  className='edit-order'
                >
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(order, 'order_status')}
                className='edit-order'
              >
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {order.orderdetail && order.orderdetail.cs_agent ? (
              <>
                {order.orderdetail.cs_agent.first_name} <br />
                <button
                  onClick={() => handleEditModal(order, 'cs_agent')}
                  className='edit-order'
                >
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(order, 'cs_agent')}
                className='edit-order'
              >
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {order.orderdetail && order.orderdetail.mt ? (
              order.orderdetail.mt.first_name
            ) : (
              <span>&mdash;</span>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {/* {order.orderdetail && order.orderdetail.order_type === 'non_covid'
            ? 'NON COVID'
            : 'COVID'} */}
            {order.orderdetail && order.orderdetail.order_type ? (
              order.orderdetail.order_type
            ) : (
              <span>&mdash;</span>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {order.orderdetail ? (
              order.orderdetail.references
            ) : (
              <span>&mdash;</span>
            )}
          </p>
        </td>
        {/* <td className='pl-3'>
        <p className='mb-0 font-weight-bold pr-3'>
          Injamamul Haque <br />
          Age: 26 <br />
          Sex: Male <br />
          Address: 72, Janata Housing, Ring road, Shyamoli
        </p>
      </td> */}
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {order.orderdetail ? (
              order.orderdetail.persona
            ) : (
              <span>&mdash;</span>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold pr-2'>
            {order.orderitem[0].address.mobile || ''}
            <br /> {order.orderitem[0].address.email || ''}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {order.orderitem[0].address.address
              ? `${order.orderitem[0].address.address}, `
              : ''}
            {`${order.orderitem[0].address.thana}, `}
            {order.orderitem[0].address.district}
          </p>
        </td>
        <td className='pl-3'>
          <div className='mb-0 font-weight-bold'>
            {order.orderitem.map((item, i) => (
              <div key={i} className='mb-2'>
                <div className='items'>
                  &mdash;{' '}
                  {
                    item.purchasable_order_item.testitem_purchasable_oi
                      .diagnostic_test.name
                  }{' '}
                  <br />{' '}
                  <span className='text-dark-50'>
                    Price: ৳ BDT {item.purchasable_order_item.sell_price}
                  </span>{' '}
                  <br />
                  Lab:{' '}
                  {
                    item.purchasable_order_item.testitem_purchasable_oi.branch
                      .lab.name
                  }{' '}
                  <br /> Patient: {item.patient.full_name}
                </div>
              </div>
            ))}
            <div className='items mt-3'>
              &mdash; Service Fee: <br />{' '}
              <span className='text-dark-50'>৳ BDT 960</span> <br />
            </div>
            <div className='items mt-3'>
              *{' '}
              <a href='?#' className='text-dark'>
                Test Add,
              </a>
              <br />*{' '}
              <a href='?#' className='text-dark'>
                Test Remove
              </a>
            </div>
          </div>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {moment(order.date).format('DD MMM YYYY')}, <br />
            {/* 05:15 PM */}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>BDT {order.total_price}</p>
        </td>
        <td className='pl-3'>
          <div className='mb-0 font-weight-bold'>
            {order.orderdiscount ? (
              <>
                <p className='m-0'>
                  &mdash; BDT {order.orderdiscount.discount_price} <br />
                </p>
                <p className='my-2'>
                  Reasons: <br /> {order.orderdiscount.discount_note}
                </p>
                &mdash; Himika
              </>
            ) : (
              <p>&mdash;</p>
            )}
          </div>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>BDT {order.total_price}</p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {order.orderdetail ? (
              order.orderdetail.payment_status
            ) : (
              <span>&mdash;</span>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold pr-2'>
            {order.orderdetail ? (
              order.orderdetail.order_note
            ) : (
              <span>&mdash;</span>
            )}
          </p>
        </td>
        <td className='pl-3'>
          {order.orderdelivery.length !== 0 ? (
            <>
              {order.orderdelivery.map((orderdelivery, i) => (
                <p className='mb-0 font-weight-bold' key={i}>
                  {orderdelivery.name}
                </p>
              ))}
            </>
          ) : (
            <p className='mb-0 font-weight-bold'>No report</p>
          )}
        </td>
      </tr>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        animation={false}
        size='lg'
      >
        <ModalBody>
          <div className='edit-order'>
            <h5>Edit Order</h5>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    {/* {shownItemName === 'order_status' && ( */}
                    <th className='py-4 min-w-130px'>Order Status</th>
                    {/* )} */}
                    <th className='py-4 min-w-130px'>CS Agent</th>
                    <th className='py-4 min-w-110px'>MT</th>
                    <th className='py-4 min-w-110px'>Type</th>
                    <th className='py-4 min-w-130px'>Reference</th>
                    <th className='py-4 min-w-110px'>Persona</th>
                    <th className='py-4 min-w-150px'>Payment Status</th>
                    <th className='py-4 min-w-150px'>Discount</th>
                    <th className='py-4 min-w-180px'>Report Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='pl-3'>
                      <select
                        className='single'
                        value={
                          order.orderdetail && order.orderdetail.order_status
                            ? order.orderdetail.order_status
                            : ''
                        }
                      >
                        <option value='processing'>Processing</option>
                        <option value='confirmed'>Confirmed</option>
                      </select>
                    </td>
                    <td className='pl-3'>
                      <select
                        className='single'
                        value={
                          order.orderdetail && order.orderdetail.cs_agent
                            ? order.orderdetail.cs_agent.id
                            : ''
                        }
                      >
                        {users &&
                          users.map((user, i) => (
                            <option value={user.id} key={i}>
                              {user.username}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className='pl-3'>
                      <select
                        className='single'
                        value={
                          order.orderdetail && order.orderdetail.mt
                            ? order.orderdetail.mt.id
                            : ''
                        }
                      >
                        {users &&
                          users.map((user, i) => (
                            <option value={user.id} key={i}>
                              {user.username}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className='pl-3'>
                      <select
                        value={
                          order.orderdetail && order.orderdetail.order_type
                            ? order.orderdetail.order_type
                            : ''
                        }
                        className='single'
                      >
                        <option value='covid'>Covid</option>
                        <option value='non_covid'>Non Covid</option>
                      </select>
                    </td>
                    <td className='pl-3'>
                      <textarea
                        value={
                          order.orderdetail && order.orderdetail.references
                            ? order.orderdetail.references
                            : ''
                        }
                      ></textarea>
                    </td>
                    <td className='pl-3'>
                      <select
                        className='single'
                        value={
                          order.orderdetail && order.orderdetail.persona
                            ? order.orderdetail.persona
                            : ''
                        }
                      >
                        <option value='coronic'>Coronic</option>
                      </select>
                    </td>
                    <td className='pl-3'>
                      <select
                        value={
                          order.orderdetail && order.orderdetail.payment_status
                            ? order.orderdetail.payment_status
                            : ''
                        }
                        className='single'
                      >
                        <option value='paid'>Paid</option>
                        <option value='unpaid'>Unpaid</option>
                      </select>
                    </td>
                    <td className='pl-3'>
                      <input
                        type='number'
                        placeholder='discount price'
                        className='txt'
                        value={
                          order.orderdiscount &&
                          order.orderdiscount.discount_price
                            ? order.orderdiscount.discount_price
                            : ''
                        }
                      />
                      <textarea
                        name=''
                        placeholder='discount note'
                        value={
                          order.orderdiscount &&
                          order.orderdiscount.discount_note
                            ? order.orderdiscount.discount_note
                            : ''
                        }
                      ></textarea>
                      <p className='font-weight-bold my-1 ml-1'>By:</p>
                      <select
                        style={{ width: '100%' }}
                        className='single'
                        value={
                          order.orderdiscount && order.orderdiscount.discount_by
                            ? order.orderdiscount.discount_by.id
                            : ''
                        }
                      >
                        {users &&
                          users.map((user, i) => (
                            <option value={user.id} key={i}>
                              {user.username}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className='pl-3'>
                      <select className='single'>
                        <option value='order_received'>Order Received</option>
                        <option value='sample_collected'>
                          Sample Collected
                        </option>
                        <option value='sample_delivered_to_lab'>
                          Sample Delivered to Lab
                        </option>
                        <option value='completed'>Completed</option>
                        <option value='on_hold'>On Hold</option>
                        <option value='cancel'>Cancel</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderTable;
