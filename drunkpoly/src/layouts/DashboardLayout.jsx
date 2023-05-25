import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {db, analytics, provider} from '../Firebase-config'
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
          }});
      }

    useEffect(() => {
        authUser();
    }, [])

    return (
        <div className="dashboard row">
            <button onClick={sign_out}>Sign Out</button>
        </div>
    )
}