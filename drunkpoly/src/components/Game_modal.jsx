import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {db, analytics, provider} from '../Firebase-config'
import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import { collection, query, where, getDocs, getDoc, addDoc, setDoc, doc } from "firebase/firestore";


const GameModal = () => {
  const [user, setUser] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gameName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  });

  const authUser = async () => {
    onAuthStateChanged(auth, (userData) => {
      if (!userData) {
        navigate('/');
      } else if (userData) {
        setUser(userData);
      }});
  };

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    authUser();
    openModal();
  }, [])

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
        // 2. Access the user document and create a new game in the 'games' collection
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
              gameName: gameName
          });

          const playersCollectionRef = collection(gameDocRef, "players");

          const player1DocRef = doc(playersCollectionRef, "player1");
          await setDoc(player1DocRef, {
              name: player1,
              position: 1
          });

          const player2DocRef = doc(playersCollectionRef, "player2");
          await setDoc(player2DocRef, {
              name: player2,
              position: 1
          });

          const player3DocRef = doc(playersCollectionRef, "player3");
          await setDoc(player3DocRef, {
              name: player3,
              position: 1
          });

          const player4DocRef = doc(playersCollectionRef, "player4");
          await setDoc(player4DocRef, {
              name: player4,
              position: 1
          });

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
          <Modal isOpen={modalIsOpen} contentLabel="Example Modal" ariaHideApp={false}>
              <h2>Maak een nieuw spel</h2>
              <form className="row" onSubmit={handleAddGame}>
              {/* Render your form inputs here */}
              <label className="col-md-11">Spel Naam</label>
              <input className="col-md-9" type="text" name="gameName" onChange={handleInputChange} value={formData.gameName}/>
              <label className="col-md-11">Speler 1</label>
              <input className="col-md-9" type="text" name="player1" onChange={handleInputChange} value={formData.player1}/>
              <label className="col-md-11">Speler 2</label>
              <input className="col-md-9" type="text" name="player2" onChange={handleInputChange} value={formData.player2}/>
              <label className="col-md-11">Speler 3</label>
              <input className="col-md-9" type="text" name="player3" onChange={handleInputChange} value={formData.player3}/>
              <label className="col-md-11">Speler 4</label>
              <input className="col-md-9" type="text" name="player4" onChange={handleInputChange} value={formData.player4}/>
              <button className="col-md-4" type="submit">Create game</button>
              </form>
          </Modal>
      )
}
export default GameModal;