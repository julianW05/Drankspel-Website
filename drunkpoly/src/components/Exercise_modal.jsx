import React from 'react';
import Modal from 'react-modal';

const ShowExerciseModal = ({ position, closeModal }) => {
  return (
    <Modal isOpen={true} ariaHideApp={false}>
      <h2>Exercise Position: {position}</h2>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default ShowExerciseModal;