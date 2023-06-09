import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import sign_out from '../functions/Google-signout';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {query, collection, where, getDocs, doc} from 'firebase/firestore';
import {db} from '../Firebase-config';

export default function DashboardLayout() {
    const [user, setUser] = useState([]);
    const [uid, setUid] = useState();
    const navigate = useNavigate();
    const auth = getAuth();
    let gamesTemp = [];
    let gamesIdTemp = [];
    const [games, setGames] = useState();
    const [gamesId, setGamesId] = useState();

    const authUser = async () => {
        onAuthStateChanged(auth, (userData) => {
          if (!userData) {
            navigate('/');
          } else if (userData) {
            setUser(userData);
            setUid(userData.uid);
          }});
      }

      useEffect(() => {
        authUser();
        getGames();
    }, [user])

    const getGames = async () => {
        console.log(user);
        const userDocRef = query(collection(db, "users"), where('uid', '==', uid));
        const userSnapshot = await getDocs(userDocRef);
        userSnapshot.forEach(async (document) => {
            const user_db = doc(db, "users", document.id);
            const gamesCollectionRef = query(collection(user_db, "games"));
            const gamesSnapshot = await getDocs(gamesCollectionRef);
            gamesSnapshot.forEach(async (documentGames) => {
                gamesIdTemp.push(documentGames.id);
                gamesTemp.push(documentGames.data().gameName);
            });
            setGames(gamesTemp);
            setGamesId(gamesIdTemp);
        });
    }       

    return (
        <div className="dashboard">
            <div className="blur_container">
                <div className="dashboard_content row">
                    <h1 className="col-md-10">{!user ? '' : 'Welkom ' + user.displayName}</h1>
                    <button className="col-md-2 sign_out" onClick={sign_out}>Log uit</button>
                    <div className="col-md-12 dashboard_games">
                        <div className="row dashboard_game">
                            <NavLink to={`/game/${null}`} >
                                    <h5 className="col-md-12">Nieuwe game</h5>
                            </NavLink>
                        </div>
                        {gamesId ? gamesId.map((gameId) => {
                        <div className="row dashboard_game">
                            <NavLink to={`/game/${gameId}`} >
                                    <h5 className="col-md-12">Game hervatten</h5>
                            </NavLink>
                        </div>
                        }) : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}