import { useEffect, useState } from 'react'
import './App.css'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider,
  useNavigate
} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";

// PAGES //

// COMPONENTS //
import Game_modal from './components/Game_modal'

// LAYOUTS //
import GameLayout from './layouts/GameLayout'
import LoginLayout from './layouts/LoginLayout'
import DashboardLayout from './layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
  },
  {
    path: "game/:gameId",
    element: <GameLayout />,
    children: [
      {
        path: "/gameModal",
        element:  <Game_modal />,
      },]
  },
]);

function App() {
  const [user, setUser] = useState();
  const auth = getAuth();
  
  const authUser = async () => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }});
  }

  const goToDashboard = () => {
    const navigate = useNavigate();
    navigate('/dashboard');
  }

  useEffect(() => {
    authUser();
  }, [])

  console.log(user);
  return (
    <RouterProvider router={router} />
  )
}

export default App;