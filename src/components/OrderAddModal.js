import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DateSelect from './DateSelect';
import PatientDob from './PatientDob';
import SearchTests from './SearchTests';
import SelectLab from './SelectLab';
import SelectUser from './SelectUser';
import TimeSelect from './TimeSelect';

const OrderAddModal = ({ showAddModal, setShowAddModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUserAddForm, setShowUserAddForm] = useState(false);

  const [testType, setTestType] = useState('diagnostic');

  const [orders, setOrders] = useState([]);

  //modal
  const [showTestModal, setShowTestModal] = useState(false);

  //for orders
  const [userDetails, setUserDetails] = useState(null);
  const [allLabs, setAllLabs] = useState([]);
  const [orderPatients, setOrderPatients] = useState([]);
  const [labDetails, setLabDetails] = useState(null);

  const [userPatients, setUserPatients] = useState(null);

  // address
  const [district, setDistrict] = useState('dhaka');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [sampleDate, setSampleDate] = useState(null);
  const [sampleTime, setSampleTime] = useState(null);

  //patient add
  const [showPatAddForm, setShowPatAddForm] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientDob, setPatientDob] = useState(null);

  // Test Fees
  const [fees, setFees] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/diagnostic/fees/`)
      .then((resp) => setFees(resp.data.results[0]));
  }, []);

  const getTotalPrice = (array) => {
    const diagnosticrr = array.filter((diag) => {
      return diag.order_type === 'diagnostic';
    });

    const packagerr = array.filter((diag) => {
      return diag.order_type === 'package';
    });

    const diagprice = diagnosticrr.reduce(
      (total, item) =>
        total + parseInt(item.test_item.purchasable_order_item.sell_price),
      0
    );

    const packprice = packagerr.reduce(
      (total, item) =>
        total +
        parseInt(item.test_item.test_item.purchasable_order_item.sell_price),
      0
    );

    return diagprice + packprice;
  };

  const getTotalPriceWithFees = (array) => {
    const diagnosticrr = array.filter((diag) => {
      return diag.order_type === 'diagnostic';
    });

    const packagerr = array.filter((diag) => {
      return diag.order_type === 'package';
    });

    const diagprice = diagnosticrr.reduce(
      (total, item) =>
        total + parseInt(item.test_item.purchasable_order_item.sell_price),
      0
    );

    const packprice = packagerr.reduce(
      (total, item) =>
        total +
        parseInt(item.test_item.test_item.purchasable_order_item.sell_price),
      0
    );

    return (
      diagprice +
      packprice +
      fees.collection_fee +
      orders.length * fees.meterial_fee
    );
  };

  const handleUserCreation = (e) => {
    e.preventDefault();
    let numberPattern = /^01\d{9}$/;
    if (!numberPattern.test(username)) {
      toast.error('Please enter a valid mobile number', {
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
    setOrders([]);
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
        order_type: labDetails.order_type,
        patient: person,
        test_item: labDetails,
      };
    });

    // console.log(carts);

    // const order = {
    //   user: userDetails,
    //   order_item: carts,
    // };
    setOrders([...orders, ...carts]);
    // console.log([...orders, ...carts]);
    setShowTestModal(false);
    setOrderPatients([]);
    toast.success('Test added successfully.', {
      autoClose: 3000,
    });
  };

  const handleOrderSave = () => {
    const numberPattern = /^01\d{9}$/;

    if (!numberPattern.test(mobile)) {
      toast.error('Please enter a valid mobile number.', {
        autoClose: 3000,
      });
    } else if (district.trim() === '') {
      toast.error('Please select location district.', {
        autoClose: 3000,
      });
    } else if (thana.trim() === '') {
      toast.error('Please enter location area.', {
        autoClose: 3000,
      });
    } else if (address.trim() === '') {
      toast.error('Please enter location details.', {
        autoClose: 3000,
      });
    } else if (sampleDate === '' || sampleDate === null) {
      toast.error('Please select a date.', {
        autoClose: 3000,
      });
    } else if (sampleTime === '' || sampleTime === null) {
      toast.error('Please select a time.', {
        autoClose: 3000,
      });
    } else {
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
              meterial_fee: fees.meterial_fee,
              purchasable_order_item:
                order.order_type === 'package'
                  ? `${order.test_item.test_item.purchasable_order_item.id}`
                  : `${order.test_item.purchasable_order_item.id}`,
            };
          });

          const postOrder = {
            user: userDetails.id,
            date: moment(sampleDate).format('YYYY-MM-DD'),
            time: moment(sampleTime).format('hh:mm:ss'),
            orderitem: order_items,
            total_price: getTotalPriceWithFees(orders),
            collection_fee: fees.collection_fee,
          };

          axios
            .post(`${process.env.REACT_APP_BASE_URL}/order/order/`, postOrder)
            .then((resp) => {
              console.log(resp.data);
              setUserDetails(null);
              setOrders([]);
              setMobile('');
              setEmail('');
              setDistrict('dhaka');
              setThana('');
              setAddress('');
              setSampleDate(null);
              setSampleTime(null);
              setShowAddModal(false);
              toast.success('Order places successfully.', {
                autoClose: 3000,
              });
              window.location.reload();
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
    }
  };

  const handleDeleteOrder = (order) => {
    // console.log(order);
    setOrders(orders.filter((o) => o !== order));
    toast.success('Test removed successfully.', {
      autoClose: 3000,
    });
  };

  const handleAddNewPatient = (e) => {
    e.preventDefault();

    if (patientName.trim() === '') {
      toast.error(`Please enter patient name.`, {
        autoClose: 3000,
      });
    } else if (patientName.length < 4) {
      toast.error(`Patient name must be at least three character long.`, {
        autoClose: 3000,
      });
    } else if (patientGender === '') {
      toast.error(`Please enter patient gender.`, {
        autoClose: 3000,
      });
    } else if (patientDob === '' || patientDob === null) {
      toast.error(`Please enter patient date of birth.`, {
        autoClose: 3000,
      });
    } else {
      const postPatient = {
        full_name: patientName,
        dob: moment(patientDob).format('YYYY-MM-DD'),
        sex: patientGender,
        user: userDetails.id,
      };
      // console.log(postPatient);

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user_management/patient/`,
          postPatient
        )
        .then((resp) => {
          // console.log(resp.data);
          setUserPatients([...userPatients, resp.data]);
          setPatientName('');
          setPatientGender('');
          setPatientDob(null);
          setShowPatAddForm(false);
        });
    }
  };

  const handleOrderClear = () => {
    // console.log('clear order modal');
    setOrders([]);
    setUserDetails(null);
    setMobile('');
    setEmail('');
    setDistrict('dhaka');
    setThana('');
    setAddress('');
    setSampleDate(null);
    setSampleTime(null);
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
            <div className='pl-4 mb-3 d-flex justify-content-between align-items-center'>
              <h5>Add New Order</h5>
              <button
                className='btn btn-sm btn-danger'
                onClick={() => setShowAddModal(false)}
              >
                Close
              </button>
            </div>
            <div className='table-responsive' style={{ minHeight: '250px' }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='pl-5 py-4 min-w-150px'>User</th>
                    {userDetails && (
                      <th className='py-4 min-w-150px'>Order Details</th>
                    )}
                    {userDetails && (
                      <th className='py-4 min-w-130px'>Cart Value</th>
                    )}
                    {orders.length !== 0 && (
                      <th className='py-4 min-w-170px'>Contact</th>
                    )}
                    {orders.length !== 0 && (
                      <th className='py-4 min-w-150px'>Area</th>
                    )}
                    {orders.length !== 0 && (
                      <th className='py-4 min-w-150px'>Sample Collection</th>
                    )}
                    {orders.length !== 0 && (
                      <th className='py-4 min-w-130px'>Confirm</th>
                    )}
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
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure to remove this user?'
                                  )
                                )
                                  handleUserDetails();
                              }}
                            ></i>
                          </p>
                        ) : (
                          <>
                            {!showUserAddForm && (
                              <>
                                <SelectUser
                                  setUserDetails={setUserDetails}
                                  setUserPatients={setUserPatients}
                                />
                                <p className='my-3 pl-1'>
                                  Or,{' '}
                                  <span
                                    className='pointer text-primary'
                                    onClick={() => setShowUserAddForm(true)}
                                  >
                                    Add new user?
                                  </span>
                                </p>
                              </>
                            )}
                            {showUserAddForm && (
                              <>
                                <form onSubmit={handleUserCreation}>
                                  <div className='form-group mb-2 mt-2'>
                                    <input
                                      type='text'
                                      placeholder='enter moblie number'
                                      value={username}
                                      onChange={(e) =>
                                        setUsername(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className='form-group mb-2'>
                                    <input
                                      type='password'
                                      placeholder='enter password'
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                    />
                                  </div>
                                  <button className='btn btn-success btn-sm'>
                                    Create
                                  </button>
                                </form>
                                <p className='my-3 pl-1'>
                                  Or,{' '}
                                  <span
                                    className='pointer text-primary'
                                    onClick={() => setShowUserAddForm(false)}
                                  >
                                    select existing user?
                                  </span>
                                </p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    {userDetails && (
                      <td className='pl-3'>
                        <div className='items mt-3 font-weight-bold'>
                          {orders.length !== 0 &&
                            orders.map((order, i) => (
                              <div key={i} className='mb-2'>
                                <div className='items'>
                                  &mdash;{' '}
                                  {order.order_type === 'package'
                                    ? `${order.test_item.package.name}`
                                    : `${order.test_item.diagnostic_test.name}`}{' '}
                                  <i
                                    className='fas fa-times ml-1 text-danger pointer'
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          'Are you sure to delete this item?'
                                        )
                                      )
                                        handleDeleteOrder(order);
                                    }}
                                  ></i>
                                  <br />
                                  <span className='text-dark-50'>
                                    Price: ৳ BDT{' '}
                                    {order.order_type === 'package'
                                      ? `${order.test_item.test_item.purchasable_order_item.sell_price}`
                                      : `${order.test_item.purchasable_order_item.sell_price}`}
                                  </span>{' '}
                                  <br />
                                  Lab:
                                  {order.order_type === 'package'
                                    ? `${order.test_item.test_item.branch.lab.name}`
                                    : `${order.test_item.branch.lab.name}`}
                                  <br />
                                  Patient: {order.patient.full_name}
                                </div>
                              </div>
                            ))}
                          <span
                            className='pointer bg-primary text-white px-3 py-1 rounded'
                            onClick={() => setShowTestModal(true)}
                          >
                            <i
                              className='fas fa-plus text-white'
                              style={{ fontSize: '12px' }}
                            ></i>{' '}
                            Test Add
                          </span>
                        </div>
                      </td>
                    )}
                    {userDetails && (
                      <td className='pl-3'>
                        BDT {getTotalPriceWithFees(orders)}
                      </td>
                    )}
                    {orders.length !== 0 && (
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
                    )}
                    {orders.length !== 0 && (
                      <td className='pl-3'>
                        <select onChange={(e) => setDistrict(e.target.value)}>
                          <option value='Dhaka'>Dhaka</option>
                          <option value='Chattogram'>Chattogram</option>
                        </select>
                        <input
                          className='my-2'
                          type='text'
                          placeholder='location area'
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
                    )}
                    {orders.length !== 0 && (
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
                    )}
                    {orders.length !== 0 && (
                      <td className='pl-3'>
                        <button
                          className='btn btn-primary btn-sm mb-3'
                          onClick={handleOrderSave}
                        >
                          Confirm Order
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger btn-sm'
                          onClick={handleOrderClear}
                        >
                          Clear
                        </button>
                      </td>
                    )}
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
          <i
            className='fas fa-times-circle close'
            onClick={() => setShowTestModal(false)}
          ></i>
          <h5>Select Test type</h5>
          <select
            className='form-control my-3'
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
          >
            <option value='diagnostic'>Diagnostic</option>
            <option value='package'>Package</option>
          </select>
          <h5 className='mt-3'>Select Test</h5>
          <SearchTests testType={testType} setAllLabs={setAllLabs} />
          {/* {allLabs && (
            <> */}
          <h5 className='mt-3'>Select Lab</h5>
          <SelectLab allLabs={allLabs} setLabDetails={setLabDetails} />
          {/* </>
          )} */}
          {userPatients && (
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

          {!showPatAddForm && (
            <span
              onClick={() => setShowPatAddForm(true)}
              className='bg-success text-white rounded px-2 py-1 pointer'
            >
              Add New Patient
            </span>
          )}

          {showPatAddForm && (
            <form className='pat-add' onSubmit={handleAddNewPatient}>
              <div className='first d-flex'>
                <div className='left mr-2'>
                  <input
                    type='text'
                    placeholder='Patient name'
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
                <div className='right ml-2'>
                  <p className='mb-0 font-size-lg font-weight-bold'>Gender</p>
                  <div className='male-female d-flex'>
                    <label className='gender'>
                      Male
                      <input
                        type='radio'
                        name='gender'
                        value='male'
                        onChange={(e) => setPatientGender(e.target.value)}
                      />
                      <span className='checkmark'></span>
                    </label>
                    <label className='gender'>
                      Female
                      <input
                        type='radio'
                        name='gender'
                        value='female'
                        onChange={(e) => setPatientGender(e.target.value)}
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className='last'>
                <PatientDob
                  patientDob={patientDob}
                  setPatientDob={setPatientDob}
                />
              </div>
              <button className='btn btn-primary btn-sm mt-2'>
                Add Patient
              </button>
            </form>
          )}

          {orderPatients.length !== 0 && labDetails && (
            <>
              <br />
              <button
                className='btn btn-primary btn-sm mt-3'
                onClick={handleSingleTestAdd}
              >
                Add Test
              </button>
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderAddModal;
