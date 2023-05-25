import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import sign_out from '../functions/Google-signout'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function DashboardLayout() {
    const userID = new URLSearchParams(location.search).get('userID');
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const auth = getAuth();
    console.log(userID);

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
    }, [])

    return (
        <div className="dashboard">
            <div className="blur_container">
                <div className="dashboard_content row">
                    <h1 className="col-md-10">{!user ? '' : 'Welkom ' + user.displayName}</h1>
                    <button className="col-md-2 sign_out" onClick={sign_out}>Log uit</button>
                    <div className="col-md-12 dashboard_games">
                        <div className="row dashboard_game">
                            <a href="">
                                <h5 className="col-md-12">Nieuwe game</h5>
                            </a>
                        </div>
                        <div className="row dashboard_game">
                            <a href="">
                                <h5 className="col-md-12">Game hervatten</h5>
                            </a>
                        </div>
                        <div className="row dashboard_game">
                            <a href="">
                                <h5 className="col-md-12">Game hervatten</h5>
                            </a>
                        </div>
                        <div className="row dashboard_game">
                            <a href="">
                                <h5 className="col-md-12">Game hervatten</h5>
                            </a>
                        </div>
                        <div className="row dashboard_game">
                            <a href="">
                                <h5 className="col-md-12">Game hervatten</h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}