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
import GameModal from './components/Game_modal'

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
        path: "gameModal",
        element:  <GameModal />,
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

  return (
    <RouterProvider router={router} />
  )
}

export default App;