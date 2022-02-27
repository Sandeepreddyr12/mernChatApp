
import { useCallback, useState } from "react";
import {Routes,Route,} from "react-router-dom";

import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";
import Home from "./home/Home";
import Profile from "./pages/profile/profile";
// import People from "./pages/people/component/people";
import Users from "./pages/people/Users";
import { UserContext }  from "./context/userContext";
import { useAuth } from "./Authentication/authHook/auth-hook";
import Navbar from "./components/navigation/navbar";

function App() {

  const { token, login, logout, user } = useAuth();
  console.log(user)

  return (
    <UserContext.Provider value = {{user,login,logout,token}}>
      <div  style={{backgroundColor : "#ecc7c7"}}>
      <Navbar/>
    <Routes>
    <Route path = "/" element = {!!token ? <Home/> : <Login/> }/>
       <Route path = "/profile" element = {<Profile/>}/>
       <Route path = "/people" element = {<Users/>}/>
      <Route path = "/register" element = {!!token ? <Home/> : <Register/> }/> 
    </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
