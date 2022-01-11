import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./services/firebase";
import "./App.scss";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  console.log(user);
  console.log(process.env);

  return <div className="App">{user ? <Home user={user} /> : <Login />}</div>;
}

export default App;
