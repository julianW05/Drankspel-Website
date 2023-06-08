import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged,  } from "firebase/auth";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import Modal from 'react-modal';
import { db } from '../Firebase-config.jsx';

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

  // Create game -----------------------------------
  const [formData, setFormData] = useState({
    gameName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleAddGame = async (event) => {
    event.preventDefault();

    const { gameName, player1, player2, player3, player4 } = formData;

    try {
      // 1. Collect the UID from the Google login (assuming you already have it)
      const uid = "nV5lUuro24Q1S9vzCJOdvi2fcE82";

      // 2. Access the user document and create a new game in the 'games' collection
      const userDocRef = db.collection('users').where('uid', '==', uid);
      const userSnapshot = await userDocRef.get();

      if (userSnapshot.empty) {
        console.error('User document not found');
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const gamesCollection = userDoc.ref.collection('games');
      const newGameRef = gamesCollection.doc();

      // 3. Set the game name in the 'games' collection
      await newGameRef.set({ gameName });

      // 4. Create 'player1', 'player2', 'player3', and 'player4' collections
      const playersCollection = newGameRef.collection('players');

      // Create player documents with position 0
      await playersCollection.doc('player1').set({ name: player1, position: 0 });
      await playersCollection.doc('player2').set({ name: player2, position: 0 });
      await playersCollection.doc('player3').set({ name: player3, position: 0 });
      await playersCollection.doc('player4').set({ name: player4, position: 0 });

      // Clear the form data
      setFormData({
        gameName: '',
        player1: '',
        player2: '',
        player3: '',
        player4: ''
      });

      console.log('Game created successfully!');
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };
    
    return (
        <div className="game">
            <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <h2>Make new game</h2>
            <form onSubmit={handleAddGame}>
            {/* Render your form inputs here */}
            <input
                type="text"
                name="gameName"
                onChange={handleInputChange}
                placeholder="Game naam"
                value={formData.gameName}
            />
            <input
                type="text"
                name="player1"
                onChange={handleInputChange}
                placeholder="Player 1"
                value={formData.player1}
            />
            <input
                type="text"
                name="player2"
                onChange={handleInputChange}
                placeholder="Player 2"
                value={formData.player2}
            />
            <input
                type="text"
                name="player3"
                onChange={handleInputChange}
                placeholder="Player 3"
                value={formData.player3}
            />
            <input
                type="text"
                name="player4"
                onChange={handleInputChange}
                placeholder="Player 4"
                value={formData.player4}
            />
            <button type="submit">Create game</button>
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