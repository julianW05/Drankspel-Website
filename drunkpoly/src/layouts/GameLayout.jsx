import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged,  } from "firebase/auth";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
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
      const userDocRef = query(collection(db, "users"), where('uid', '==', uid));
      const userSnapshot = await getDocs(userDocRef);

      if (userSnapshot.empty) {
        console.error('User document not found');
        return;
      }

      userSnapshot.forEach(async (document) => {
        const user = doc(db, "users", document.id);
        const gamesCollection = await addDoc(collection(user, "games"), {
            game_name: gameName
          });
          const playerCollection = await addDoc(collection(gamesCollection, "players"), {
            placeholder: ""
          });
          const player_1 = doc(db, 'users', document.id, gamesCollection, playerCollection, "player_1")
          await setDoc(player_1, {
              name: player1,
              position: 1
          });
            const player_2 = doc(db, playerCollection, "player_2");
            await setDoc(player_2, {
                name: player2,
                position: 1
            });
            const player_3 = doc(db, playerCollection, "player_3");
            await setDoc(player_3, {
                name: player3,
                position: 1
            });
            const player_4 = doc(db, playerCollection, "player_4");
            await setDoc(player_4, {
                name: player4,
                position: 1
            });
      });
      


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