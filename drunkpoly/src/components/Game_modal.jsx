import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {db, analytics, provider} from '../Firebase-config'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import {query, collection, where, getDocs, doc} from 'firebase/firestore';

const game_form = async() => {
  const [user, setUser] = useState();

    const authUser = async () => {
      onAuthStateChanged(auth, (userData) => {
        if (!userData) {
          navigate('/');
        } else if (userData) {
          setUser(userData);
        }});
    }

    function openModal() {
        setIsOpen(true);
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

    useEffect(() => {
      authUser();
      openModal();
    }, [])

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
            <h2>Make new game</h2>
            <form onSubmit={handleAddGame}>
            {/* Render your form inputs here */}
            <input type="text" name="gameName" onChange={handleInputChange} placeholder="Game naam" value={formData.gameName}
            />
            <input type="text" name="player1" onChange={handleInputChange} placeholder="Player 1" value={formData.player1}
            />
            <input type="text" name="player2" onChange={handleInputChange} placeholder="Player 2" value={formData.player2}
            />
            <input type="text" name="player3" onChange={handleInputChange} placeholder="Player 3" value={formData.player3}
            />
            <input type="text" name="player4" onChange={handleInputChange} placeholder="Player 4" value={formData.player4}
            />
            <button type="submit">Create game</button>
            </form>
        </Modal>
    )
}
export default game_form;