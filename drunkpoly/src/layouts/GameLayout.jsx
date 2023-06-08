import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function DashboardLayout() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const auth = getAuth();

  const authUser = async () => {
      onAuthStateChanged(auth, (userData) => {
        if (!userData) {
          navigate('/');
        } else if (userData) {
          setUser(userData);
        }});
    }

  useEffect(() => {
      authUser();
  }, [])

  const newGame = new URLSearchParams(location.search).get('newGame');

  const [modalIsOpen, setIsOpen] = React.useState(false);

  let subtitle;
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  return (
    <div className="dashboard">
      <h1>game</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Make new game</h2>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
    
  )	
}