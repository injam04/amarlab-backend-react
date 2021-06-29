import { Modal, ModalBody } from 'react-bootstrap';

const OrderAddModal = ({ showAddModal, setShowAddModal }) => {
  return (
    <>
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        animation={false}
        size='lg'
      >
        <ModalBody>
          <div className='modal-body'>
            <h5>Add New Order</h5>
            <div className='table-responsive'>
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
                      <p className='mb-0 font-weight-bold'>01685970744</p>
                    </td>
                    <td className='pl-3'>
                      <div className='items mt-3'>
                        <a href='?#' className='btn btn-primary btn-sm'>
                          Test Add
                        </a>
                      </div>
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

export default OrderAddModal;
