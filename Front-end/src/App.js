
import { useState } from "react";
import {Routes,Route,} from "react-router-dom";

import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";
import Home from "./home/Home";
import { UserContext }  from "./context/userContext";

function App() {

  const [auth, setauth] = useState({
    user : null,
    isLoggedIn : false,
    error : null
  });
  console.log(auth)
  
  // const login = () =>{

  // }


  return (
    <UserContext.Provider value = {{auth, setauth}}>
    <Routes>
    <Route path = "/" element = {auth.isLoggedIn ? <Home/> : <Login/> }/>
      {/* <Route path = "/login" element = {<Login/>}/> */}
      <Route path = "/register" element = {auth.isLoggedIn ? <Home/> : <Register/> }/>
    </Routes>
    </UserContext.Provider>
  );
}

export default App;
