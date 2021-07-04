const OrderItemEdit = () => {
  return (
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
