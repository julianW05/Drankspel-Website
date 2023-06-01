import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
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

    useEffect(() => {
        authUser();
    }, [])

}