import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db, analytics, provider} from '../Firebase-config'
import { useEffect, useState } from 'react'
import sign_in from '../functions/Google-signin'
import sign_out from '../functions/Google-signout'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function LoginLayout() {
  const auth = getAuth();
  const navigate = useNavigate();

  const authUser = async () => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        navigate('/dashboard');
      }});
  }

  useEffect(() => {
    authUser();
  }, [])

  return (
    <div className="login">
      <div className="left col-md-6">
        <div className="title_content row">
          <h1 className="col-md-12">Welkom Bij <b>Drunk Poly</b></h1>
          <div className="col-md-3 line"></div>
          <p className="col-md-12">Log in om te starten met spelen</p>
        </div>
      </div>
      <div className="right col-md-6">
        <div className="details_login">
          <p>Deze website is gemaakt door Julian en Sil.<br></br>
          Wij studeren Software Development en dit is ons eindproject<br></br> 
          voor het framework React. Ons leek het leuk om een drankspel <br></br>
          wat wij soms speelden na te maken. Met als doel het ook echt <br></br>
          op een avond te kunnen spelen met onze groep.<br></br>
          Log in en kom er achter hoe het is geworden!</p>
        </div>
        <div className="copyright">
          <p>© 2023 Julian Wessels | Sil Theunissen</p>
        </div>
      </div>
        <div className="login_box">
          <h3 className="col-md-12">Login</h3>
          <div className="login_btns row">
            <button className="col-md-10" onClick={sign_in}>Log in</button>
            <button className="col-md-10" onClick={sign_out}>Log uit</button>
          </div>
        </div>
          <Outlet />
    </div>
  )
}