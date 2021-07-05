import axios from 'axios';
import { parseInt } from 'lodash';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OrderItemEdit from './OrderItemEdit';

const OrderTable = ({ order }) => {
  const [mainOrder, setMainOrder] = useState(order);
  const [showEditModal, setShowEditModal] = useState(false);
  const [users, setUsers] = useState(null);
  const [orderManager, setOrderManager] = useState(null);

  const [shownItemName, setShownItemName] = useState('');

  //check null
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderDiscount, setOrderDiscount] = useState(null);

  const [orderId, setOrderId] = useState(null);
  const [orderDetailsId, setOrderDetailsId] = useState(null);
  const [orderDiscountId, setOrderDiscountId] = useState(null);

  // order details
  const [orderStatus, setOrderStatus] = useState(
    mainOrder.orderdetail && mainOrder.orderdetail.order_status
  );
  const [csAgent, setCsAgent] = useState(
    mainOrder.orderdetail &&
      mainOrder.orderdetail.cs_agent &&
      mainOrder.orderdetail.cs_agent.id
  );
  const [mt, setMt] = useState(
    mainOrder.orderdetail &&
      mainOrder.orderdetail.mt &&
      mainOrder.orderdetail.mt.id
  );
  const [orderType, setOrderType] = useState(
    mainOrder.orderdetail && mainOrder.orderdetail.order_type
  );
  const [orderReference, setOrderReference] = useState(
    mainOrder.orderdetail && mainOrder.orderdetail.references
  );
  const [orderPersona, setOrderPersona] = useState(
    mainOrder.orderdetail && mainOrder.orderdetail.persona
  );
  const [orderPaymentStatus, setOrderPaymentStatus] = useState(
    mainOrder.orderdetail && mainOrder.orderdetail.payment_status
  );
  const [orderNote, setOrderNote] = useState(
    mainOrder.orderdetail && mainOrder.orderdetail.order_note
  );

  // order discount
  const [orderDiscountNote, setOrderDiscountNote] = useState(
    mainOrder.orderdiscount && mainOrder.orderdiscount.discount_note
  );
  const [orderDiscountPrice, setOrderDiscountPrice] = useState(
    mainOrder.orderdiscount && mainOrder.orderdiscount.discount_price
  );
  const [orderDiscountBy, setOrderDiscountBy] = useState(
    mainOrder.orderdiscount &&
      mainOrder.orderdiscount.discount_by &&
      mainOrder.orderdiscount.discount_by.id
  );

  // order delivery
  const [reportDelivery, setReportDelivery] = useState('');

  // Order Item
  const [itemEditModal, setItemEditModal] = useState(false);
  const [userPatients, setUserPatients] = useState(null);
  const [orderEditId, setOrderEditId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [orderUserId, setOrderUserId] = useState(null);

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

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/user/?groups__name=Order%20Manager&page=1&limit=1000000&ofset=0`
      )
      .then((resp) => {
        // console.log(resp.data.results);
        setOrderManager(resp.data.results);
      });
  }, []);

  const _toSpace = (string) => {
    let newStr = string.replace('_', ' ');
    return newStr;
  };

  const getSingleOrderTree = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order/order-tree/${id}`)
      .then((resp) => {
        // console.log(resp.data);
        setMainOrder(resp.data);
      });
  };

  const handleEditModal = (order, name) => {
    setShowEditModal(true);
    // console.log(order);
    setOrderId(order.id);
    setOrderDetailsId(order.orderdetail ? order.orderdetail.id : null);
    setOrderDiscountId(order.orderdiscount ? order.orderdiscount.id : null);
    // console.log(name);
    setShownItemName(name);
    setOrderDelivery(order.orderdelivery);
    setOrderDetails(order.orderdetail);
    setOrderDiscount(order.orderdiscount);
  };

  const ajaxOrderDetailsPost = (postDate) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/order/order-detail/`, postDate)
      .then((resp) => {
        // console.log(resp.data);
        getSingleOrderTree(resp.data.order);
        toast.success(`Order status saved sucessfully.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(`Something went wrong, plase try again later.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      });
  };

  const ajaxOrderDetailsPut = (postDate, id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/order/order-detail/${id}/`,
        postDate
      )
      .then((resp) => {
        // console.log(resp.data);
        getSingleOrderTree(resp.data.order);
        mainOrder.orderdetail = resp.data;
        toast.success(`Order status saved sucessfully.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(`Something went wrong, plase try again later.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      });
  };

  const handleOrderStatus = () => {
    // console.log(orderStatus);
    if (orderStatus === '' || orderStatus === null) {
      toast.error(`Select Order Status.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        order_status: orderStatus,
        order: orderId,
      };
      const putOrderDetails = {
        order_status: orderStatus,
      };

      if (orderDetails === null) {
        // console.log('Post request');
        // console.log(postOrderDetails);
        ajaxOrderDetailsPost(postOrderDetails);
      } else {
        // console.log('Put request');
        // console.log(postOrderDetails);
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
      }
    }
  };

  const handleOrderCs = () => {
    if (csAgent === '' || csAgent === null) {
      toast.error(`Select cs agent.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        cs_agent: parseInt(csAgent),
        order: orderId,
      };
      const putOrderDetails = {
        cs_agent: parseInt(csAgent),
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
      }
    }
  };

  const handleOrderMt = () => {
    if (mt === '' || mt === null) {
      toast.error(`Select medical technologist.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        mt: parseInt(mt),
        order: orderId,
      };
      const putOrderDetails = {
        mt: parseInt(mt),
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
      }
    }
  };

  const handleOrderType = () => {
    if (orderType === '' || orderType === null) {
      toast.error(`Select Order type.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        order_type: orderType,
        order: orderId,
      };
      const putOrderDetails = {
        order_type: orderType,
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
        // console.log(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
        // console.log(putOrderDetails);
      }
    }
  };

  const handleOrderReference = () => {
    if (orderReference === '' || orderReference === null) {
      toast.error(`Please enter Order reference.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        references: orderReference,
        order: orderId,
      };
      const putOrderDetails = {
        references: orderReference,
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
        // console.log(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
        // console.log(putOrderDetails);
      }
    }
  };

  const handleOrderPersona = () => {
    if (orderPersona === '' || orderPersona === null) {
      toast.error(`Please select Order reference.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        persona: orderPersona,
        order: orderId,
      };
      const putOrderDetails = {
        persona: orderPersona,
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
        // console.log(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
        // console.log(putOrderDetails);
      }
    }
  };

  const handleOrderPayStatus = () => {
    if (orderPaymentStatus === '' || orderPaymentStatus === null) {
      toast.error(`Please select Order status.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        payment_status: orderPaymentStatus,
        order: orderId,
      };
      const putOrderDetails = {
        payment_status: orderPaymentStatus,
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
        // console.log(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
        // console.log(putOrderDetails);
      }
    }
  };

  const handleOrderNote = () => {
    if (orderNote === '' || orderNote === null) {
      toast.error(`Please select Order status.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDetails = {
        order_note: orderNote,
        order: orderId,
      };
      const putOrderDetails = {
        order_note: orderNote,
      };
      if (orderDetails === null) {
        ajaxOrderDetailsPost(postOrderDetails);
        // console.log(postOrderDetails);
      } else {
        ajaxOrderDetailsPut(putOrderDetails, orderDetailsId);
        // console.log(putOrderDetails);
      }
    }
  };

  const ajaxOrderDiscountPost = (postDate) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/order/order-discount/`, postDate)
      .then((resp) => {
        getSingleOrderTree(resp.data.order);
        toast.success(`Order discount saved sucessfully.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(`Something went wrong, plase try again later.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      });
  };

  const ajaxOrderDiscountPut = (postDate, id) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/order/order-discount/${id}/`,
        postDate
      )
      .then((resp) => {
        // console.log(resp.data);
        getSingleOrderTree(resp.data.order);
        toast.success(`Order discount saved sucessfully.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(`Something went wrong, plase try again later.`, {
          autoClose: 3000,
        });
        setShowEditModal(false);
      });
  };

  const handleOrderDiscount = () => {
    if (orderDiscountNote === '' || orderDiscountNote === null) {
      toast.error(`Please enter discount note.`, {
        autoClose: 3000,
      });
    } else if (orderDiscountPrice === '' || orderDiscountPrice === null) {
      toast.error(`Please enter discount price.`, {
        autoClose: 3000,
      });
    } else if (orderDiscountBy === '' || orderDiscountBy === null) {
      toast.error(`Please select discount by.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDiscount = {
        order: orderId,
        discount_note: orderDiscountNote,
        discount_price: parseInt(orderDiscountPrice),
        discount_by: parseInt(orderDiscountBy),
      };
      const putOrderDiscount = {
        discount_note: orderDiscountNote,
        discount_price: parseInt(orderDiscountPrice),
        discount_by: parseInt(orderDiscountBy),
      };
      if (orderDiscount === null) {
        ajaxOrderDiscountPost(postOrderDiscount);
        // console.log(postOrderDiscount);
      } else {
        ajaxOrderDiscountPut(putOrderDiscount, orderDiscountId);
        // console.log(putOrderDiscount);
      }
    }
  };

  const handleReportDelivery = () => {
    if (reportDelivery === '' || reportDelivery === null) {
      toast.error(`Please select delivery status.`, {
        autoClose: 3000,
      });
    } else {
      const postOrderDelivery = {
        order: orderId,
        name: reportDelivery,
      };

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/order/order-delivery-status/`,
          postOrderDelivery
        )
        .then((resp) => {
          // console.log(resp.data);
          mainOrder.orderdelivery.push(resp.data);
          toast.success(`Report delivery saved sucessfully.`, {
            autoClose: 3000,
          });
          setShowEditModal(false);
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(`Something went wrong, plase try again later.`, {
            autoClose: 3000,
          });
          setShowEditModal(false);
        });

      // const putOrderDelivery = {
      //   name: reportDelivery,
      // };
      // if (orderDelivery.length === 0) {
      //   // ajaxOrderDiscountPost(postOrderDiscount);
      //   console.log(postOrderDelivery);
      // } else {
      //   // ajaxOrderDiscountPut(putOrderDiscount, orderDiscountId);
      //   console.log(putOrderDelivery);
      // }
    }
  };

  const handleOrItDlt = (item) => {
    const orderId = item.order.id;
    // console.log(orderId);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/order/order-item/${item.id}/`)
      .then((resp) => {
        // console.log(resp.data);
        // getSingleOrderTree(orderId);
        orderItemGet(orderId);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleTestItemModal = (order) => {
    console.log(order);
    setAddressId(
      order.orderitem.length !== 0 && order.orderitem[0].address !== null
        ? order.orderitem[0].address.id
        : null
    );
    setOrderEditId(order.id);
    setOrderUserId(order.user.id);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/patient/?user=${order.user.id}`
      )
      .then((resp) => {
        const results = resp.data.results;
        // console.log(results);
        setUserPatients(results);
        setItemEditModal(true);
      });
  };

  const orderItemGet = (orderEditId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/order/order-item-get/?order=${orderEditId}`
      )
      .then((resp) => {
        const items = resp.data.results;
        // console.log(items);
        const totalPrice = items.reduce((total, item) => {
          return total + parseInt(item.purchasable_order_item.sell_price);
        }, 0);
        // console.log(totalPrice);

        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/order/order-only/${orderEditId}/`,
            {
              total_price: totalPrice,
            }
          )
          .then((resp) => {
            // console.log(resp.data);
            getSingleOrderTree(orderEditId);
            setItemEditModal(false);
          })
          .catch((error) => {
            console.log(error.response);
          });
      });
  };

  const testItemModalClose = () => {
    // getSingleOrderTree(orderEditId);
    // setItemEditModal(false);
    setTimeout(() => {
      orderItemGet(orderEditId);
    }, 1000);
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
          <p className='mb-0 font-weight-bolder text-capitalize'>
            {mainOrder.orderdetail ? (
              <>
                <span
                  className={`${
                    mainOrder.orderdetail.order_status === 'processing'
                      ? 'text-warning'
                      : 'text-green'
                  }`}
                >
                  {mainOrder.orderdetail.order_status} <br />
                </span>
                <button
                  onClick={() => handleEditModal(mainOrder, 'order_status')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'order_status')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {mainOrder.orderdetail && mainOrder.orderdetail.cs_agent ? (
              <>
                {mainOrder.orderdetail.cs_agent.username} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'cs_agent')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'cs_agent')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            {mainOrder.orderdetail && mainOrder.orderdetail.mt ? (
              <>
                {mainOrder.orderdetail.mt.username} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'mt')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'mt')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {mainOrder.orderdetail && mainOrder.orderdetail.order_type ? (
              <>
                {_toSpace(mainOrder.orderdetail.order_type)} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'order_type')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'order_type')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {mainOrder.orderdetail && mainOrder.orderdetail.references ? (
              <>
                {mainOrder.orderdetail.references} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'references')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'references')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {mainOrder.orderdetail && mainOrder.orderdetail.persona ? (
              <>
                {mainOrder.orderdetail.persona} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'persona')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'persona')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          {mainOrder.orderitem.length !== 0 && (
            <p className='mb-0 font-weight-bold pr-2'>
              {mainOrder.orderitem[0].address
                ? mainOrder.orderitem[0].address.mobile
                : ''}
              <br />{' '}
              {mainOrder.orderitem[0].address
                ? mainOrder.orderitem[0].address.email
                : ''}
            </p>
          )}
        </td>
        <td className='pl-3'>
          {mainOrder.orderitem.length !== 0 && (
            <p className='mb-0 font-weight-bold'>
              {mainOrder.orderitem[0].address !== null
                ? `${mainOrder.orderitem[0].address.address}, `
                : ''}
              {mainOrder.orderitem[0].address !== null
                ? `${mainOrder.orderitem[0].address.thana}, `
                : ''}
              {mainOrder.orderitem[0].address !== null
                ? `${mainOrder.orderitem[0].address.district}, `
                : ''}
            </p>
          )}
        </td>
        <td className='pl-3'>
          <div className='mb-0 font-weight-bold'>
            {mainOrder.orderitem &&
              mainOrder.orderitem.map((item, i) => (
                <div key={i} className='mb-2'>
                  <div className='items'>
                    <span className=' d-flex align-items-end'>
                      &mdash;{' '}
                      {
                        item.purchasable_order_item.testitem_purchasable_oi
                          .diagnostic_test.name
                      }{' '}
                      <i
                        // onClick={() => handleOrItDlt(item)}
                        onClick={() => {
                          if (
                            window.confirm('Are you sure to delete this item?')
                          )
                            handleOrItDlt(item);
                        }}
                        className='fas fa-times text-danger pointer ml-2'
                      ></i>
                    </span>
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
              <button
                className='add-order'
                onClick={() => handleTestItemModal(mainOrder)}
              >
                <i className='fas fa-plus'></i>Test Add
              </button>
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
          <p className='mb-0 font-weight-bold'>BDT {mainOrder.total_price}</p>
        </td>
        <td className='pl-3'>
          <div className='mb-0 font-weight-bold'>
            {mainOrder.orderdiscount ? (
              <>
                <p className='m-0'>
                  &mdash; BDT {mainOrder.orderdiscount.discount_price} <br />
                </p>
                <p className='my-2'>
                  Reasons: <br /> {mainOrder.orderdiscount.discount_note}
                </p>
                &mdash; {mainOrder.orderdiscount.discount_by.username} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'orderdiscount')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'orderdiscount')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </div>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold'>
            BDT{' '}
            {mainOrder.orderdiscount
              ? `${
                  parseInt(mainOrder.total_price) -
                  parseInt(mainOrder.orderdiscount.discount_price)
                }.00`
              : mainOrder.total_price}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold text-capitalize'>
            {mainOrder.orderdetail ? (
              <>
                {mainOrder.orderdetail.payment_status} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'payment_status')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'payment_status')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          <p className='mb-0 font-weight-bold pr-2'>
            {mainOrder.orderdetail && mainOrder.orderdetail.order_note ? (
              <>
                {mainOrder.orderdetail.order_note} <br />
                <button
                  onClick={() => handleEditModal(mainOrder, 'order_note')}
                  className='edit-order'
                >
                  <i className='far fa-edit'></i>
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditModal(mainOrder, 'order_note')}
                className='add-order'
              >
                <i className='fas fa-plus'></i>
                Add
              </button>
            )}
          </p>
        </td>
        <td className='pl-3'>
          {mainOrder.orderdelivery.length !== 0 ? (
            <>
              {mainOrder.orderdelivery.map((orderdelivery, i) => (
                <p className='mb-0 font-weight-bold text-capitalize' key={i}>
                  {_toSpace(orderdelivery.name)}
                </p>
              ))}{' '}
              <br />
              <button
                onClick={() => handleEditModal(mainOrder, 'orderdelivery')}
                className='edit-order'
              >
                <i className='far fa-edit'></i>
                Edit
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEditModal(mainOrder, 'orderdelivery')}
              className='add-order'
            >
              <i className='fas fa-plus'></i>
              Add
            </button>
          )}
        </td>
      </tr>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        animation={false}
        // size='lg'
      >
        <ModalBody>
          <div className='edit-order'>
            <div className='pl-3 d-flex justify-content-between align-items-center'>
              <h5>Edit Order</h5>
              <button
                className='btn btn-sm btn-danger'
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
            </div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    {shownItemName === 'order_status' && (
                      <th className='py-4 min-w-130px'>Order Status</th>
                    )}
                    {shownItemName === 'cs_agent' && (
                      <th className='py-4 min-w-130px'>CS Agent</th>
                    )}
                    {shownItemName === 'mt' && (
                      <th className='py-4 min-w-110px'>MT</th>
                    )}
                    {shownItemName === 'order_type' && (
                      <th className='py-4 min-w-110px'>Type</th>
                    )}
                    {shownItemName === 'references' && (
                      <th className='py-4 min-w-130px'>Reference</th>
                    )}
                    {shownItemName === 'persona' && (
                      <th className='py-4 min-w-110px'>Persona</th>
                    )}
                    {shownItemName === 'payment_status' && (
                      <th className='py-4 min-w-150px'>Payment Status</th>
                    )}
                    {shownItemName === 'order_note' && (
                      <th className='py-4 min-w-150px'>Order Note</th>
                    )}
                    {shownItemName === 'orderdiscount' && (
                      <th className='py-4 min-w-150px'>Discount</th>
                    )}
                    {shownItemName === 'orderdelivery' && (
                      <th className='py-4 min-w-180px'>Report Delivery</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {shownItemName === 'order_status' && (
                      <td className='pl-3'>
                        <select
                          className='single form-control form-control-lg'
                          value={orderStatus || ''}
                          onChange={(e) => setOrderStatus(e.target.value)}
                        >
                          <option value=''>Select order status</option>
                          <option value='processing'>Processing</option>
                          <option value='confirmed'>Confirmed</option>
                        </select>{' '}
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderStatus}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'cs_agent' && (
                      <td className='pl-3'>
                        <select
                          className='single form-control form-control-lg'
                          value={csAgent || ''}
                          onChange={(e) => setCsAgent(e.target.value)}
                        >
                          <option value=''>Select cs agent</option>
                          {orderManager &&
                            orderManager.map((user, i) => (
                              <option value={user.id} key={i}>
                                {user.username}
                              </option>
                            ))}
                        </select>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderCs}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'mt' && (
                      <td className='pl-3'>
                        <select
                          className='single form-control form-control-lg'
                          value={mt || ''}
                          onChange={(e) => setMt(e.target.value)}
                        >
                          <option value=''>Select medical technologist</option>
                          {users &&
                            users.map((user, i) => (
                              <option value={user.id} key={i}>
                                {user.username}
                              </option>
                            ))}
                        </select>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderMt}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'order_type' && (
                      <td className='pl-3'>
                        <select
                          value={orderType || ''}
                          className='single form-control form-control-lg'
                          onChange={(e) => setOrderType(e.target.value)}
                        >
                          <option value=''>Select order type</option>
                          <option value='covid'>Covid</option>
                          <option value='non_covid'>Non Covid</option>
                        </select>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderType}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'references' && (
                      <td className='pl-3'>
                        <textarea
                          className='form-control'
                          value={orderReference || ''}
                          onChange={(e) => setOrderReference(e.target.value)}
                        ></textarea>
                        <br />
                        <button
                          className='btn btn-primary btn-sm mt-2'
                          onClick={handleOrderReference}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'persona' && (
                      <td className='pl-3'>
                        <select
                          className='single form-control form-control-lg'
                          value={orderPersona || ''}
                          onChange={(e) => setOrderPersona(e.target.value)}
                        >
                          <option value=''>Select order persona</option>
                          <option value='coronic'>Coronic</option>
                        </select>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderPersona}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'payment_status' && (
                      <td className='pl-3'>
                        <select
                          value={orderPaymentStatus || ''}
                          className='single form-control form-control-lg'
                          onChange={(e) =>
                            setOrderPaymentStatus(e.target.value)
                          }
                        >
                          <option value=''>Select order payment status</option>
                          <option value='paid'>Paid</option>
                          <option value='unpaid'>Unpaid</option>
                        </select>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderPayStatus}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'order_note' && (
                      <td className='pl-3'>
                        <textarea
                          className='form-control form-control-lg'
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                        ></textarea>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderNote}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'orderdiscount' && (
                      <td className='pl-3'>
                        <input
                          type='number'
                          placeholder='discount price'
                          className='mb-2 form-control form-control-lg'
                          value={orderDiscountPrice || ''}
                          onChange={(e) =>
                            setOrderDiscountPrice(e.target.value)
                          }
                        />
                        <textarea
                          className='form-control form-control-lg'
                          placeholder='discount note'
                          value={orderDiscountNote || ''}
                          onChange={(e) => setOrderDiscountNote(e.target.value)}
                        ></textarea>
                        <p className='font-weight-bold my-1 mt-2 ml-1'>By:</p>
                        <select
                          className='single form-control form-control-lg'
                          value={orderDiscountBy || ''}
                          onChange={(e) => setOrderDiscountBy(e.target.value)}
                        >
                          <option value=''>Select discount by</option>
                          {orderManager &&
                            orderManager.map((user, i) => (
                              <option value={user.id} key={i}>
                                {user.username}
                              </option>
                            ))}
                        </select>
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleOrderDiscount}
                        >
                          Save
                        </button>
                      </td>
                    )}
                    {shownItemName === 'orderdelivery' && (
                      <td className='pl-3'>
                        <select
                          className='single form-control form-control-lg'
                          onChange={(e) => setReportDelivery(e.target.value)}
                        >
                          <option value=''>Select delivery status</option>
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
                        <br />
                        <button
                          className='btn btn-primary'
                          onClick={handleReportDelivery}
                        >
                          Save
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <button className='btn btn-primary btn-sm'>Save</button> */}
          </div>
        </ModalBody>
      </Modal>

      <OrderItemEdit
        itemEditModal={itemEditModal}
        setItemEditModal={setItemEditModal}
        userPatients={userPatients}
        setUserPatients={setUserPatients}
        addressId={addressId}
        orderEditId={orderEditId}
        testItemModalClose={testItemModalClose}
        orderUserId={orderUserId}
      />
    </>
  );
};

export default OrderTable;
