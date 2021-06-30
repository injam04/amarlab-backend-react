import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DateSelect from './DateSelect';
import SearchTests from './SearchTests';
import SelectLab from './SelectLab';
import SelectUser from './SelectUser';
import TimeSelect from './TimeSelect';

const OrderAddModal = ({ showAddModal, setShowAddModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [testType, setTestType] = useState('package');

  const [orders, setOrders] = useState([]);

  //modal
  const [showTestModal, setShowTestModal] = useState(false);

  //for orders
  const [userDetails, setUserDetails] = useState(null);
  const [allLabs, setAllLabs] = useState(null);
  const [orderPatients, setOrderPatients] = useState([]);
  const [labDetails, setLabDetails] = useState(null);

  const [userPatients, setUserPatients] = useState(null);

  // address
  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [sampleDate, setSampleDate] = useState(null);
  const [sampleTime, setSampleTime] = useState(null);

  const getTotalPrice = (array) => {
    const price = array.reduce((total, item) => {
      return total + parseInt(item.test_item.purchasable_order_item.sell_price);
    }, 0);

    // console.log(price);
    return price;
  };

  const handleUserCreation = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      toast.error('Please enter a username', {
        autoClose: 3000,
      });
    } else if (password.trim() === '') {
      toast.error('Please enter a password', {
        autoClose: 3000,
      });
    } else {
      const postUser = {
        username: username,
        password: password,
      };

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user_management/user/`,
          postUser
        )
        .then((resp) => {
          // console.log(resp.data);
          const user_id = resp.data.id;
          const userDetails = {
            username: resp.data.username,
            id: resp.data.id,
          };
          setUserDetails(userDetails);

          const postPatient = {
            is_account: true,
            user: resp.data.id,
            full_name: resp.data.username,
          };
          axios
            .post(
              `${process.env.REACT_APP_BASE_URL}/user_management/patient/`,
              postPatient
            )
            .then((resp) => {
              // console.log(resp.data);
              toast.success(`User added successfully.`, {
                autoClose: 3000,
              });
              setUsername('');
              setPassword('');
              axios
                .get(
                  `${process.env.REACT_APP_BASE_URL}/user_management/patient/?user=${user_id}`
                )
                .then((resp) => {
                  const results = resp.data.results;
                  // console.log(results);
                  setUserPatients(results);
                });
              // this.props.history.push('/users');
            });
        })
        .catch((error) => {
          // console.log(error.response);
          if (error.response.status === 400) {
            if (error.response.data.username) {
              toast.error(`${error.response.data.username}`, {
                autoClose: 3000,
              });
            } else if (error.response.data.email) {
              toast.error(`${error.response.data.email}`, {
                autoClose: 3000,
              });
            } else if (error.response.data.password) {
              toast.error(`${error.response.data.password}`, {
                autoClose: 3000,
              });
            } else {
              toast.error(
                'Sorry something went wrong, please try again later.',
                {
                  autoClose: 3000,
                }
              );
            }
          } else {
            toast.error('Sorry something went wrong, please try again later.', {
              autoClose: 3000,
            });
          }
        });

      // console.log(postUser);
    }
  };

  const handleUserDetails = () => {
    setUserDetails(null);
  };

  const handleFamilyMember = (e, patient) => {
    if (e.target.checked) {
      setOrderPatients([...orderPatients, patient]);
    } else {
      // setOrderPatients.filter(
      //   (person) => person.full_name !== patient.full_name
      // );
      setOrderPatients(
        orderPatients.filter((person) => person.full_name !== patient.full_name)
      );
    }
  };

  const handleSingleTestAdd = () => {
    // console.log(orderPatients);
    // console.log(labDetails);
    // console.log(userDetails);

    const carts = orderPatients.map((person) => {
      return {
        order_type: 'diagnostic',
        patient: person,
        test_item: labDetails,
      };
    });

    // const order = {
    //   user: userDetails,
    //   order_item: carts,
    // };
    setOrders([...orders, ...carts]);
    // console.log([...orders, ...carts]);
    setShowTestModal(false);
    setOrderPatients([]);
  };

  const handleOrderSave = () => {
    const postAddress = {
      district: district,
      thana: thana,
      address: address,
      mobile: mobile,
      email: email,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user_management/address/`,
        postAddress
      )
      .then((resp) => {
        console.log(resp.data.id);
        const order_items = orders.map((order) => {
          return {
            patient: order.patient.id,
            order_type: order.order_type,
            address: resp.data.id,
            purchasable_order_item: order.test_item.purchasable_order_item.id,
          };
        });

        const postOrder = {
          user: userDetails.id,
          date: moment(sampleDate).format('YYYY-MM-DD'),
          time: moment(sampleTime).format('hh:mm A'),
          orderitem: order_items,
          total_price: getTotalPrice(orders),
        };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/order/order/`, postOrder)
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.address) {
            toast.error(`Address: ${error.response.data.address[0]}`, {
              autoClose: 3000,
            });
          }
        }
      });
  };

  return (
    <>
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        animation={false}
        size='lg'
      >
        <ModalBody>
          <div className='create-order'>
            <h5>Add New Order</h5>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='pl-5 py-4 min-w-150px'>User</th>
                    <th className='py-4 min-w-150px'>Order Details</th>
                    <th className='py-4 min-w-170px'>Contact</th>
                    <th className='py-4 min-w-150px'>Area</th>
                    <th className='py-4 min-w-150px'>Sample Collection</th>
                    <th className='py-4 min-w-130px'>Cart Value</th>
                    <th className='py-4 min-w-130px'>Confirm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='pl-4'>
                      <div className='mb-0 mt-3 font-weight-bold add-user'>
                        {userDetails ? (
                          <p className='ml-1 mb-0 d-flex align-items-end'>
                            {userDetails.username}{' '}
                            <i
                              className='fas fa-times ml-1 text-danger pointer'
                              onClick={handleUserDetails}
                            ></i>
                          </p>
                        ) : (
                          <>
                            <SelectUser
                              setUserDetails={setUserDetails}
                              setUserPatients={setUserPatients}
                            />
                            <p className='my-3 pl-1'>Or, Add new user?</p>
                            <form onSubmit={handleUserCreation}>
                              <div className='form-group mb-2 mt-2'>
                                <input
                                  type='text'
                                  placeholder='username'
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                              </div>
                              <div className='form-group mb-2'>
                                <input
                                  type='password'
                                  placeholder='password'
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <button className='btn btn-success btn-sm'>
                                Create
                              </button>
                            </form>
                          </>
                        )}
                      </div>
                    </td>
                    <td className='pl-3'>
                      <div className='items mt-3 font-weight-bold'>
                        {orders.length !== 0 &&
                          orders.map((order, i) => (
                            <div key={i} className='mb-2'>
                              <div className='items'>
                                &mdash; {order.test_item.diagnostic_test.name}{' '}
                                <br />
                                <span className='text-dark-50'>
                                  Price: ৳ BDT{' '}
                                  {
                                    order.test_item.purchasable_order_item
                                      .sell_price
                                  }
                                </span>{' '}
                                <br />
                                Lab: {order.test_item.branch.lab.name} <br />
                                Patient: {order.patient.full_name}
                              </div>
                            </div>
                          ))}
                        <span
                          className='pointer bg-primary text-white px-3 py-1 rounded'
                          onClick={() => setShowTestModal(true)}
                        >
                          Test Add
                        </span>
                      </div>
                    </td>
                    <td className='pl-3'>
                      <input
                        type='number'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder='enter number'
                      />
                      <input
                        className='mt-2'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='enter email'
                      />
                    </td>
                    <td className='pl-3'>
                      <select onChange={(e) => setDistrict(e.target.value)}>
                        <option value='Dhaka'>Dhaka</option>
                        <option value='Chattogram'>Chattogram</option>
                      </select>
                      <input
                        className='my-2'
                        type='text'
                        placeholder='enter thana'
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                      />
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type='text'
                        placeholder='location details'
                      />
                      {/* <input type='text' placeholder='popular landmark' /> */}
                    </td>
                    <td className='pl-3'>
                      <DateSelect
                        sampleDate={sampleDate}
                        setSampleDate={setSampleDate}
                      />
                      <TimeSelect
                        sampleTime={sampleTime}
                        setSampleTime={setSampleTime}
                      />
                    </td>
                    <td className='pl-3'>BDT {getTotalPrice(orders)}</td>
                    <td className='pl-3'>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={handleOrderSave}
                      >
                        Save Order
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        show={showTestModal}
        animation={false}
        onHide={() => setShowTestModal(false)}
      >
        <ModalBody className='create-order-lab-pat'>
          <h1>Select Test type</h1>
          <select
            className='form-control my-3'
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
          >
            <option value='diagnostic'>Diagnostic</option>
            <option value='package'>Package</option>
          </select>
          <h5 className='mt-3'>Search Test</h5>
          <SearchTests testType={testType} setAllLabs={setAllLabs} />
          {allLabs && (
            <>
              <h5 className='mt-3'>Select Lab</h5>
              <SelectLab allLabs={allLabs} setLabDetails={setLabDetails} />
            </>
          )}
          {userPatients && labDetails && (
            <div className='patientsss'>
              <h5 className='mt-3'>Select Patient</h5>
              {userPatients.map((patient, i) => (
                <label className='single' key={i}>
                  <span className=''>{patient.full_name}</span>
                  <input
                    type='checkbox'
                    name='pat'
                    onChange={(e) => handleFamilyMember(e, patient)}
                  />
                  <span className='checkmark'></span>
                </label>
              ))}
            </div>
          )}

          <button
            className='btn btn-primary btn-sm mt-3'
            onClick={handleSingleTestAdd}
          >
            Add Test
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderAddModal;
