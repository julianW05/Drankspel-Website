import { useEffect, useState } from 'react'
import './App.css'
import sign_in from './functions/Google-signin'
import sign_out from './functions/Google-signout'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState();
  const auth = getAuth();
  
  const authUser = async () => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }});
  }

  useEffect(() => {
    authUser();
  }, [])

  console.log(user);
  return (
    <div className="App">
      <div className="nav">
        <h2>{!user ? '' : 'Welcome ' + user.displayName}</h2>
        <button onClick={sign_in}>Sign In</button>
        <button onClick={sign_out}>Sign Out</button>
      </div>
      <h1>Drunk Poly</h1>
    </div>
  )
}

export default App;