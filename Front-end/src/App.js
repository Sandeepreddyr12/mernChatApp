
import { useCallback, useState } from "react";
import {Routes,Route,} from "react-router-dom";

import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";
import Home from "./home/Home";
import { UserContext }  from "./context/userContext";

function App() {

  const [user, setuser] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  console.log(user)
  
  const login = useCallback((data) =>{
    setuser(data);
  setisLoggedIn(true);
  } ,[isLoggedIn])

  const logout = useCallback((data) =>{
    setuser(null);
    setisLoggedIn(false);
  } ,[isLoggedIn])


  return (
    <UserContext.Provider value = {{user,login,logout}}>
    <Routes>
    <Route path = "/" element = {isLoggedIn ? <Home/> : <Login/> }/>
      {/* <Route path = "/login" element = {<Login/>}/> */}
      <Route path = "/register" element = {isLoggedIn ? <Home/> : <Register/> }/>
    </Routes>
    </UserContext.Provider>
  );
}

export default App;
