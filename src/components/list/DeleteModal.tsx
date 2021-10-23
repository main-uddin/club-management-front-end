import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import {
  isOpenDeleteModal,
  setIsOpenDeleteModal,
} from '../../redux/commonSlice';
import { deleteMember, selectedMemberSelector } from '../../redux/membersSlice';

const DeleteModal = () => {
  const isOpenModal = useSelector(isOpenDeleteModal);
  const selectedMember = useSelector(selectedMemberSelector);
  const dispatch = useDispatch();

  const handleOutSiteClick = () => {
    dispatch(setIsOpenDeleteModal(false));
  };
  const removeModal = () => {
    dispatch(setIsOpenDeleteModal(false));
  };
  const confirmDelete = () => {
    dispatch(setIsOpenDeleteModal(false));
    dispatch(deleteMember(selectedMember._id));
  };
  return (
    <>
      <Modal isOpen={isOpenModal} toggle={handleOutSiteClick} centered>
        <ModalBody>
          This ({' '}
          <span style={{ fontWeight: 'bold', color: '#dc3545' }}>
            {selectedMember.name}
          </span>{' '}
          ) member will be permanently deleted
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={removeModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteModal;
