import { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import sign_out from '../functions/Google-signout';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {query, collection, where, getDocs, doc} from 'firebase/firestore';
import {db} from '../Firebase-config';

export default function DashboardLayout() {
  const [user, setUser] = useState();
  const [gamesId, setGamesId] = useState([]);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const authUser = async () => {
    onAuthStateChanged(auth, (userData) => {
      if (!userData) {
        navigate('/');
      } else if (userData) {
        setUser(userData);
      }
    });
  };

  const getGames = async () => {
    const userDocRef = query(collection(db, "users"), where('uid', '==', user.uid));
    const userSnapshot = await getDocs(userDocRef);

    if (userSnapshot.empty) {
      console.error('User document not found');
      return;
    }

    userSnapshot.forEach(async (document) => {
      const userDb = doc(db, "users", document.id);
      const gamesCollectionRef = query(collection(userDb, "games"));
      const gamesSnapshot = await getDocs(gamesCollectionRef);
      gamesSnapshot.forEach(async (documentGames) => {
        setGamesId((prevGamesId) => [...prevGamesId, documentGames.id]);
        setGames((prevGames) => [...prevGames, documentGames.data().gameName]);
      });
    });
  };

  useEffect(() => {
    authUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      getGames();
    }
  }, [user]);

  return (
    <div className="dashboard">
      <div className="blur_container">
        <div className="dashboard_content row">
          <h1 className="col-md-10">{!user ? '' : 'Welkom ' + user.displayName}</h1>
          <button className="col-md-2 sign_out" onClick={sign_out}>Log uit</button>
          <div className="col-md-12 dashboard_games">
            <div className="row dashboard_game">
              <NavLink to={`/game/${null}/gameModal`} >
                <h5 className="col-md-12">Nieuw Spel</h5>
              </NavLink>
            </div>
            {gamesId.map((gameId, index) => (
              <div className="row dashboard_game" key={gameId}>
                <NavLink to={`/game/${gameId}`} >
                  <h5 className="col-md-12">{games[index]}</h5>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
