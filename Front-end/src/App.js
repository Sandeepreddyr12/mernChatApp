
import { useCallback, useState } from "react";
import {Routes,Route,} from "react-router-dom";

import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";
import Home from "./home/Home";
import Profile from "./pages/profile/profile";
import { UserContext }  from "./context/userContext";
import { useAuth } from "./Authentication/authHook/auth-hook";
import Navbar from "./components/navigation/navbar";

function App() {

  const { token, login, logout, user } = useAuth();
  console.log(user)

  return (
    <UserContext.Provider value = {{user,login,logout,token}}>
      <Navbar/>
    <Routes>
    <Route path = "/" element = {!!token ? <Home/> : <Login/> }/>
       <Route path = "/profile" element = {<Profile/>}/>
      <Route path = "/register" element = {!!token ? <Home/> : <Register/> }/> 
    </Routes>
    </UserContext.Provider>
  );
}

export default App;
