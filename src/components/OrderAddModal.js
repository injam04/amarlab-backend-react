import axios from 'axios';
import { useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SelectUser from './SelectUser';

const OrderAddModal = ({ showAddModal, setShowAddModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //modal
  const [showTestModal, setShowTestModal] = useState(false);

  //for orders
  const [userDetails, setUserDetails] = useState(null);
  // const [userPatients, setUserPatients] = useState(null);

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
            <div className='table-responsived'>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='pl-5 py-4 min-w-150px'>User</th>
                    <th className='py-4 min-w-150px'>Order Details</th>
                    <th className='py-4 min-w-150px'>Area</th>
                    <th className='py-4 min-w-170px'>Contact</th>
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
                            <SelectUser setUserDetails={setUserDetails} />
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
                      <div className='items mt-3'>
                        <button
                          className='btn btn-primary btn-sm'
                          onClick={() => setShowTestModal(true)}
                        >
                          Test Add
                        </button>
                      </div>
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
        <ModalBody>
          <h1>Select Test type</h1>
          <select className='form-control mt-3'>
            <option value='diagnostic'>Diagnostic</option>
            <option value='package'>Package</option>
          </select>
          <input
            type='text'
            placeholder='Search test'
            className='form-control mt-5'
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderAddModal;
