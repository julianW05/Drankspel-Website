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
    const newGame = new URLSearchParams(location.search).get('newGame');
    const [modalIsOpen, setIsOpen] = React.useState(false);
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
      openModal();
  }, [])


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
        <div className="game">
            <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <h2>Make new game</h2>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>
            <div className="blur_container">
                <div className="game_content row">
                    <div className="upper_row_main col-md-12">
                        <div className="vak_21 corner_vak vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_22 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_23 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_24 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_25 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_26 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_27 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_28 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_29 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_30 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_31 corner_vak vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                    </div>
                    <div className="left_row_main">
                        <div className="vak_20 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_19 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_18 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_17 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_16 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_15 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_14 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_13 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_12 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                    </div>
                    <div className="center"></div>
                    <div className="right_row_main">
                        <div className="vak_32 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_33 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_34 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_35 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_36 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_37 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_38 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_39 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_40 vak side_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                    </div>
                    <div className="lower_row_main">
                        <div className="vak_11 corner_vak vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_10 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_9 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_8 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_7 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_6 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_5 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_4 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_3 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_2 vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                        <div className="vak_1 corner_vak vak upper_row">
                            <div className="blauw"></div>
                            <div className="rood"></div>
                            <div className="groen"></div>
                            <div className="geel"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}