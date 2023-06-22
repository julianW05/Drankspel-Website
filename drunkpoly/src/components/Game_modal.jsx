import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, getDoc, addDoc, setDoc, doc } from "firebase/firestore";

import { db, provider } from '../Firebase-config';
import { NavLink, Link, Outlet, useNavigate, useParams } from "react-router-dom";

const GameModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gameName: '',
    playerNumber: '2',
    playerNames: ['', '']
  });  

  const auth = getAuth();

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const authUser = async () => {
      onAuthStateChanged(auth, (userData) => {
        if (!userData) {
          navigate('/');
        } else if (userData) {
          setUser(userData);
        }
      });
    };

    authUser();
    openModal();
  }, [auth]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name.startsWith("playerNames[")) {
      const index = Number(name.match(/\[(\d+)\]/)[1]);
  
      setFormData((prevState) => {
        const updatedPlayerNames = [...prevState.playerNames];
        updatedPlayerNames[index] = value;
  
        return {
          ...prevState,
          playerNames: updatedPlayerNames
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  
  

  const handleAddGame = async (event) => {
    event.preventDefault();

    const { gameName, playerNumber, playerNames } = formData;

    if (!gameName) {
      alert('Spel naam is vereist');
      return;
    } else if (!playerNumber) {
      alert('Speler aantal is vereist');
      return;
    } else if (playerNumber < 2) {
      alert('Minimaal 2 spelers vereist');
      return;
    } else if (playerNames.length !== Number(playerNumber) || playerNames.some(name => name === '')) {
      alert('Vul alle spelers in');
      return;
    }

    try {
      const userDocRef = query(collection(db, "users"), where('uid', '==', user.uid));
      const userSnapshot = await getDocs(userDocRef);

      if (userSnapshot.empty) {
        console.error('User document not found');
        return;
      }

      userSnapshot.forEach(async (document) => {
        const user_db = doc(db, "users", document.id);
        const gamesCollectionRef = collection(user_db, "games");
        const gameDocRef = await addDoc(gamesCollectionRef, {
          gameName: gameName,
          playerturn: 1
        });

        const playersCollectionRef = collection(gameDocRef, "players");

        for (let i = 0; i < playerNumber; i++) {
          const playerName = playerNames[i];
          const playerDocRef = doc(playersCollectionRef, `player${i + 1}`);
          await setDoc(playerDocRef, {
            name: playerName,
            position: 1
          });
        }

        const docSnap = await getDoc(gameDocRef);
        if (docSnap.exists()) {
          navigate(`/game/${docSnap.id}`);
        } else {
          console.log("No such document!");
        }
      });

      // Clear the form data
      setFormData({
        gameName: '',
        playerNumber: '2',
        playerNames: ['', '']
      });

      console.log('Game created successfully!');
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const renderPlayerNameInputs = () => {
    const { playerNumber, playerNames } = formData;
  
    return Array.from({ length: Number(playerNumber) }, (_, index) => (
      <div key={index}>
        <label>Speler {index + 1}</label>
        <input
          type="text"
          name={`playerNames[${index}]`}
          value={playerNames[index] || ''}
          onChange={handleInputChange}
        />
      </div>
    ));
  };  

  return (
    <Modal isOpen={modalIsOpen} contentLabel="Example Modal" ariaHideApp={false}>
      <h2>Maak een nieuw spel</h2>
      <form onSubmit={handleAddGame}>
        <div>
          <label>Spel Naam</label>
          <input
            type="text"
            name="gameName"
            value={formData.gameName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Speler Aantal</label>
          <input
            type="number"
            name="playerNumber"
            min="2"
            max="4"
            value={formData.playerNumber}
            onChange={handleInputChange}
          />
        </div>
        {renderPlayerNameInputs()}
        <button type="submit">Create game</button>
      </form>
    </Modal>
  );
};

export default GameModal;
