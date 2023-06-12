import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged,  } from "firebase/auth";
import { NavLink, Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../Firebase-config.jsx';
import game_form from '../components/Game_modal.jsx';

export default function GameLayout() {
    const gameId = useParams();
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

    console.log(gameId);

  useEffect(() => {
    authUser();
    if (gameId == "undefined") {
    game_form();
    } else {
        console.log(gameId);
    }
  }, [])
    
    return (
        <div className="game">
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