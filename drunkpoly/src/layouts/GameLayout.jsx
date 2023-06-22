import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink, Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase-config.jsx';

import DiceModal from '../components/Dice_modal.jsx';

export default function GameLayout() {
  const gameId = useParams();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  const [playerPositions, setPlayerPositions] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
  });
  const [playerTurn, setPlayerTurn] = useState(1);

  const authUser = async () => {
    onAuthStateChanged(auth, (userData) => {
      if (!userData) {
        navigate('/');
      } else if (userData) {
        setUser(userData);
      }
    });
  }

  const backToDashboard = () => {
    navigate('/dashboard');
  }

  // Game functionaliteiten -----------------------------------------------------------

  // Get the gamedata from the database -----------------------------------------------------------
  const getUser = async () => {
    const userDocRef = query(collection(db, "users"), where('uid', '==', user.uid));
    const userSnapshot = await getDocs(userDocRef);

    if (userSnapshot.empty) {
        console.error('User document not found');
        return;
    }

    userSnapshot.forEach(async (document) => {
        const user_db = doc(db, "users", document.id);
        const gamesCollectionRef = collection(user_db, "games");
        const gameDocRef = await getDocs(gamesCollectionRef);

        const game_db = doc(gamesCollectionRef, gameId.gameId);
        const playersCollectionRef = collection(game_db, "players");
        const playerDocRef = await getDocs(playersCollectionRef);

        gameDocRef.forEach(async (document) => {
            if (document.id == gameId.gameId) {
                setPlayerTurn(document.data().playerturn);
            }
        });

        playerDocRef.forEach(async (document) => {
            console.log(document.id);
            if (document.id == "player1") {
                setPlayerPositions((prevState) => ({
                ...prevState,
                player1: document.data().position
                }));
            } else if (document.id == "player2") {
                setPlayerPositions((prevState) => ({
                ...prevState,
                player2: document.data().position
                }));
            } else if (document.id == "player3") {
                setPlayerPositions((prevState) => ({
                ...prevState,
                player3: document.data().position
                }));
            } else if (document.id == "player4") {
                console.log("player 4 gevonden")
                setPlayerPositions((prevState) => ({
                ...prevState,
                player4: document.data().position
                }));
            } else {
                console.error('Player document not found');
                return;
            }
            
        });

    }); 
}


  useEffect(() => {
    authUser();
  }, []);

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
    
    return (
        <div className="game">
            <div className="blur_container">
                <div className="legend">
                    <div className="legend_item_container row">
                        <div className="blauw col-md-2"></div>
                        <div className="legend_item col-md-9">Speler 1</div>
                    </div>
                    <div className="legend_item_container row">
                        <div className="rood col-md-2"></div>
                        <div className="legend_item col-md-9">Speler 2</div>
                    </div>
                    <div className="legend_item_container row">
                        <div className="groen col-md-2"></div>
                        <div className="legend_item col-md-9">Speler 3</div>
                    </div>
                    <div className="legend_item_container row">
                        <div className="geel col-md-2"></div>
                        <div className="legend_item col-md-9">Speler 4</div>
                    </div>
                </div>
                <button className="btnBack" onClick={backToDashboard}>Terug</button>
                <DiceModal
                    playerPositions={playerPositions}
                    playerTurn={playerTurn}
                    setPlayerTurn={setPlayerTurn}
                />

                <Outlet />
                <div className="game_content row">
                    <div className="upper_row_main col-md-12">
                        <div className="vak_21 corner_vak vak upper_row">
                            {playerPositions.player1 === 21 && <div className="blauw"></div>}
                            {playerPositions.player2 === 21 && <div className="rood"></div>}
                            {playerPositions.player3 === 21 && <div className="groen"></div>}
                            {playerPositions.player4 === 21 && <div className="geel"></div>}
                        </div>
                        <div className="vak_22 vak upper_row">
                            {playerPositions.player1 === 22 && <div className="blauw"></div>}
                            {playerPositions.player2 === 22 && <div className="rood"></div>}
                            {playerPositions.player3 === 22 && <div className="groen"></div>}
                            {playerPositions.player4 === 22 && <div className="geel"></div>}
                        </div>
                        <div className="vak_23 vak upper_row">
                            {playerPositions.player1 === 23 && <div className="blauw"></div>}
                            {playerPositions.player2 === 23 && <div className="rood"></div>}
                            {playerPositions.player3 === 23 && <div className="groen"></div>}
                            {playerPositions.player4 === 23 && <div className="geel"></div>}
                        </div>
                        <div className="vak_24 vak upper_row">
                            {playerPositions.player1 === 24 && <div className="blauw"></div>}
                            {playerPositions.player2 === 24 && <div className="rood"></div>}
                            {playerPositions.player3 === 24 && <div className="groen"></div>}
                            {playerPositions.player4 === 24 && <div className="geel"></div>}
                        </div>
                        <div className="vak_25 vak upper_row">
                            {playerPositions.player1 === 25 && <div className="blauw"></div>}
                            {playerPositions.player2 === 25 && <div className="rood"></div>}
                            {playerPositions.player3 === 25 && <div className="groen"></div>}
                            {playerPositions.player4 === 25 && <div className="geel"></div>}
                        </div>
                        <div className="vak_26 vak upper_row">
                            {playerPositions.player1 === 26 && <div className="blauw"></div>}
                            {playerPositions.player2 === 26 && <div className="rood"></div>}
                            {playerPositions.player3 === 26 && <div className="groen"></div>}
                            {playerPositions.player4 === 26 && <div className="geel"></div>}
                        </div>
                        <div className="vak_27 vak upper_row">
                            {playerPositions.player1 === 27 && <div className="blauw"></div>}
                            {playerPositions.player2 === 27 && <div className="rood"></div>}
                            {playerPositions.player3 === 27 && <div className="groen"></div>}
                            {playerPositions.player4 === 27 && <div className="geel"></div>}
                        </div>
                        <div className="vak_28 vak upper_row">
                            {playerPositions.player1 === 28 && <div className="blauw"></div>}
                            {playerPositions.player2 === 28 && <div className="rood"></div>}
                            {playerPositions.player3 === 28 && <div className="groen"></div>}
                            {playerPositions.player4 === 28 && <div className="geel"></div>}
                        </div>
                        <div className="vak_29 vak upper_row">
                            {playerPositions.player1 === 29 && <div className="blauw"></div>}
                            {playerPositions.player2 === 29 && <div className="rood"></div>}
                            {playerPositions.player3 === 29 && <div className="groen"></div>}
                            {playerPositions.player4 === 29 && <div className="geel"></div>}
                        </div>
                        <div className="vak_30 vak upper_row">
                            {playerPositions.player1 === 30 && <div className="blauw"></div>}
                            {playerPositions.player2 === 30 && <div className="rood"></div>}
                            {playerPositions.player3 === 30 && <div className="groen"></div>}
                            {playerPositions.player4 === 30 && <div className="geel"></div>}
                        </div>
                        <div className="vak_31 corner_vak vak upper_row">
                            {playerPositions.player1 === 31 && <div className="blauw"></div>}
                            {playerPositions.player2 === 31 && <div className="rood"></div>}
                            {playerPositions.player3 === 31 && <div className="groen"></div>}
                            {playerPositions.player4 === 31 && <div className="geel"></div>}
                        </div>
                    </div>
                    <div className="left_row_main">
                        <div className="vak_20 vak side_row">
                            {playerPositions.player1 === 20 && <div className="blauw"></div>}
                            {playerPositions.player2 === 20 && <div className="rood"></div>}
                            {playerPositions.player3 === 20 && <div className="groen"></div>}
                            {playerPositions.player4 === 20 && <div className="geel"></div>}
                        </div>
                        <div className="vak_19 vak side_row">
                            {playerPositions.player1 === 19 && <div className="blauw"></div>}
                            {playerPositions.player2 === 19 && <div className="rood"></div>}
                            {playerPositions.player3 === 19 && <div className="groen"></div>}
                            {playerPositions.player4 === 19 && <div className="geel"></div>}
                        </div>
                        <div className="vak_18 vak side_row">
                            {playerPositions.player1 === 18 && <div className="blauw"></div>}
                            {playerPositions.player2 === 18 && <div className="rood"></div>}
                            {playerPositions.player3 === 18 && <div className="groen"></div>}
                            {playerPositions.player4 === 18 && <div className="geel"></div>}
                        </div>
                        <div className="vak_17 vak side_row">
                            {playerPositions.player1 === 17 && <div className="blauw"></div>}
                            {playerPositions.player2 === 17 && <div className="rood"></div>}
                            {playerPositions.player3 === 17 && <div className="groen"></div>}
                            {playerPositions.player4 === 17 && <div className="geel"></div>}
                        </div>
                        <div className="vak_16 vak side_row">
                            {playerPositions.player1 === 16 && <div className="blauw"></div>}
                            {playerPositions.player2 === 16 && <div className="rood"></div>}
                            {playerPositions.player3 === 16 && <div className="groen"></div>}
                            {playerPositions.player4 === 16 && <div className="geel"></div>}
                        </div>
                        <div className="vak_15 vak side_row">
                            {playerPositions.player1 === 15 && <div className="blauw"></div>}
                            {playerPositions.player2 === 15 && <div className="rood"></div>}
                            {playerPositions.player3 === 15 && <div className="groen"></div>}
                            {playerPositions.player4 === 15 && <div className="geel"></div>}
                        </div>
                        <div className="vak_14 vak side_row">
                            {playerPositions.player1 === 14 && <div className="blauw"></div>}
                            {playerPositions.player2 === 14 && <div className="rood"></div>}
                            {playerPositions.player3 === 14 && <div className="groen"></div>}
                            {playerPositions.player4 === 14 && <div className="geel"></div>}
                        </div>
                        <div className="vak_13 vak side_row">
                            {playerPositions.player1 === 13 && <div className="blauw"></div>}
                            {playerPositions.player2 === 13 && <div className="rood"></div>}
                            {playerPositions.player3 === 13 && <div className="groen"></div>}
                            {playerPositions.player4 === 13 && <div className="geel"></div>}
                        </div>
                        <div className="vak_12 vak side_row">
                            {playerPositions.player1 === 12 && <div className="blauw"></div>}
                            {playerPositions.player2 === 12 && <div className="rood"></div>}
                            {playerPositions.player3 === 12 && <div className="groen"></div>}
                            {playerPositions.player4 === 12 && <div className="geel"></div>}
                        </div>
                    </div>
                    <div className="center"></div>
                    <div className="right_row_main">
                        <div className="vak_32 vak side_row">
                            {playerPositions.player1 === 32 && <div className="blauw"></div>}
                            {playerPositions.player2 === 32 && <div className="rood"></div>}
                            {playerPositions.player3 === 32 && <div className="groen"></div>}
                            {playerPositions.player4 === 32 && <div className="geel"></div>}
                        </div>
                        <div className="vak_33 vak side_row">
                            {playerPositions.player1 === 33 && <div className="blauw"></div>}
                            {playerPositions.player2 === 33 && <div className="rood"></div>}
                            {playerPositions.player3 === 33 && <div className="groen"></div>}
                            {playerPositions.player4 === 33 && <div className="geel"></div>}
                        </div>
                        <div className="vak_34 vak side_row">
                            {playerPositions.player1 === 34 && <div className="blauw"></div>}
                            {playerPositions.player2 === 34 && <div className="rood"></div>}
                            {playerPositions.player3 === 34 && <div className="groen"></div>}
                            {playerPositions.player4 === 34 && <div className="geel"></div>}
                        </div>
                        <div className="vak_35 vak side_row">
                            {playerPositions.player1 === 35 && <div className="blauw"></div>}
                            {playerPositions.player2 === 35 && <div className="rood"></div>}
                            {playerPositions.player3 === 35 && <div className="groen"></div>}
                            {playerPositions.player4 === 35 && <div className="geel"></div>}
                        </div>
                        <div className="vak_36 vak side_row">
                            {playerPositions.player1 === 36 && <div className="blauw"></div>}
                            {playerPositions.player2 === 36 && <div className="rood"></div>}
                            {playerPositions.player3 === 36 && <div className="groen"></div>}
                            {playerPositions.player4 === 36 && <div className="geel"></div>}
                        </div>
                        <div className="vak_37 vak side_row">
                            {playerPositions.player1 === 37 && <div className="blauw"></div>}
                            {playerPositions.player2 === 37 && <div className="rood"></div>}
                            {playerPositions.player3 === 37 && <div className="groen"></div>}
                            {playerPositions.player4 === 37 && <div className="geel"></div>}
                        </div>
                        <div className="vak_38 vak side_row">
                            {playerPositions.player1 === 38 && <div className="blauw"></div>}
                            {playerPositions.player2 === 38 && <div className="rood"></div>}
                            {playerPositions.player3 === 38 && <div className="groen"></div>}
                            {playerPositions.player4 === 38 && <div className="geel"></div>}
                        </div>
                        <div className="vak_39 vak side_row">
                            {playerPositions.player1 === 39 && <div className="blauw"></div>}
                            {playerPositions.player2 === 39 && <div className="rood"></div>}
                            {playerPositions.player3 === 39 && <div className="groen"></div>}
                            {playerPositions.player4 === 39 && <div className="geel"></div>}
                        </div>
                        <div className="vak_40 vak side_row">
                            {playerPositions.player1 === 40 && <div className="blauw"></div>}
                            {playerPositions.player2 === 40 && <div className="rood"></div>}
                            {playerPositions.player3 === 40 && <div className="groen"></div>}
                            {playerPositions.player4 === 40 && <div className="geel"></div>}
                        </div>
                    </div>
                    <div className="lower_row_main">
                        <div className="vak_11 corner_vak vak upper_row">
                            {playerPositions.player1 === 11 && <div className="blauw"></div>}
                            {playerPositions.player2 === 11 && <div className="rood"></div>}
                            {playerPositions.player3 === 11 && <div className="groen"></div>}
                            {playerPositions.player4 === 11 && <div className="geel"></div>}
                        </div>
                        <div className="vak_10 vak upper_row">
                            {playerPositions.player1 === 10 && <div className="blauw"></div>}
                            {playerPositions.player2 === 10 && <div className="rood"></div>}
                            {playerPositions.player3 === 10 && <div className="groen"></div>}
                            {playerPositions.player4 === 10 && <div className="geel"></div>}
                        </div>
                        <div className="vak_9 vak upper_row">
                            {playerPositions.player1 === 9 && <div className="blauw"></div>}
                            {playerPositions.player2 === 9 && <div className="rood"></div>}
                            {playerPositions.player3 === 9 && <div className="groen"></div>}
                            {playerPositions.player4 === 9 && <div className="geel"></div>}
                        </div>
                        <div className="vak_8 vak upper_row">
                            {playerPositions.player1 === 8 && <div className="blauw"></div>}
                            {playerPositions.player2 === 8 && <div className="rood"></div>}
                            {playerPositions.player3 === 8 && <div className="groen"></div>}
                            {playerPositions.player4 === 8 && <div className="geel"></div>}
                        </div>
                        <div className="vak_7 vak upper_row">
                            {playerPositions.player1 === 7 && <div className="blauw"></div>}
                            {playerPositions.player2 === 7 && <div className="rood"></div>}
                            {playerPositions.player3 === 7 && <div className="groen"></div>}
                            {playerPositions.player4 === 7 && <div className="geel"></div>}
                        </div>
                        <div className="vak_6 vak upper_row">
                            {playerPositions.player1 === 6 && <div className="blauw"></div>}
                            {playerPositions.player2 === 6 && <div className="rood"></div>}
                            {playerPositions.player3 === 6 && <div className="groen"></div>}
                            {playerPositions.player4 === 6 && <div className="geel"></div>}
                        </div>
                        <div className="vak_5 vak upper_row">
                            {playerPositions.player1 === 5 && <div className="blauw"></div>}
                            {playerPositions.player2 === 5 && <div className="rood"></div>}
                            {playerPositions.player3 === 5 && <div className="groen"></div>}
                            {playerPositions.player4 === 5 && <div className="geel"></div>}
                        </div>
                        <div className="vak_4 vak upper_row">
                            {playerPositions.player1 === 4 && <div className="blauw"></div>}
                            {playerPositions.player2 === 4 && <div className="rood"></div>}
                            {playerPositions.player3 === 4 && <div className="groen"></div>}
                            {playerPositions.player4 === 4 && <div className="geel"></div>}
                        </div>
                        <div className="vak_3 vak upper_row">
                            {playerPositions.player1 === 3 && <div className="blauw"></div>}
                            {playerPositions.player2 === 3 && <div className="rood"></div>}
                            {playerPositions.player3 === 3 && <div className="groen"></div>}
                            {playerPositions.player4 === 3 && <div className="geel"></div>}
                        </div>
                        <div className="vak_2 vak upper_row">
                            {playerPositions.player1 === 2 && <div className="blauw"></div>}
                            {playerPositions.player2 === 2 && <div className="rood"></div>}
                            {playerPositions.player3 === 2 && <div className="groen"></div>}
                            {playerPositions.player4 === 2 && <div className="geel"></div>}
                        </div>
                        <div className="vak_1 corner_vak vak upper_row">
                            {playerPositions.player1 === 1 && <div className="blauw"></div>}
                            {playerPositions.player2 === 1 && <div className="rood"></div>}
                            {playerPositions.player3 === 1 && <div className="groen"></div>}
                            {playerPositions.player4 === 1 && <div className="geel"></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}