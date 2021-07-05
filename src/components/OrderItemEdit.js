import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PatientDob from './PatientDob';
import SearchTests from './SearchTests';
import SelectLab from './SelectLab';

const OrderItemEdit = ({
  itemEditModal,
  setItemEditModal,
  userPatients,
  setUserPatients,
  addressId,
  orderEditId,
  testItemModalClose,
  orderUserId,
}) => {
  const [testType, setTestType] = useState('diagnostic');
  const [allLabs, setAllLabs] = useState([]);
  const [labDetails, setLabDetails] = useState(null);
  const [orderPatients, setOrderPatients] = useState([]);

  //patient add
  const [showPatAddForm, setShowPatAddForm] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientDob, setPatientDob] = useState(null);

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
        user: orderUserId,
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

  const handleSingleTestAdd = () => {
    // console.log(orderPatients);
    // console.log(labDetails);

    const orderItem = orderPatients.map((patient) => {
      return {
        order: orderEditId,
        patient: patient.id,
        order_type: labDetails.order_type,
        address: addressId,
        purchasable_order_item:
          labDetails.order_type === 'diagnostic'
            ? labDetails.purchasable_order_item.id
            : labDetails.test_item.purchasable_order_item.id,
      };
    });

    orderItem.forEach((item, i) => {
      // console.log(orderItem.length, i);

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/order/order-item/`, item)
        .then((resp) => {
          // console.log(resp.data);
          if (orderItem.length === i + 1) {
            testItemModalClose();
            setTimeout(() => {
              setOrderPatients([]);
              setLabDetails(null);
            }, 1000);
          }
        })
        .catch((error) => console.log(error.response));
    });
  };

  return (
    <Modal
      show={itemEditModal}
      animation={false}
      onHide={() => setItemEditModal(false)}
    >
      <ModalBody className='create-order-lab-pat'>
        <i
          className='fas fa-times-circle close'
          onClick={() => setItemEditModal(false)}
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
        <h5 className='mt-3'>Select Lab</h5>
        <SelectLab allLabs={allLabs} setLabDetails={setLabDetails} />
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
            <button className='btn btn-primary btn-sm mt-2'>Add Patient</button>
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
  );
};

export default OrderItemEdit;
