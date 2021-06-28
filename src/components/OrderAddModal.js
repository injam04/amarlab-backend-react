import { Modal, ModalBody } from 'react-bootstrap';

const OrderAddModal = ({ showAddModal, setShowAddModal }) => {
  return (
    <>
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        animation={false}
      >
        <ModalBody>
          <div className='modal-body'>Add New Order</div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default OrderAddModal;
