
import { useCallback, useState } from "react";
import {Routes,Route,} from "react-router-dom";

import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";
import Home from "./home/Home";
import { UserContext }  from "./context/userContext";
import { useAuth } from "./Authentication/authHook/auth-hook";

function App() {

  // const [user, setuser] = useState(null);
  // const [token, settoken] = useState(null);

  // // console.log(user)
  
  // const login = useCallback((data,token) =>{
  //   setuser(data);
  // settoken(token);
  // } ,[])

  // const logout = useCallback((data) =>{
  //   setuser(null);
  //   settoken(null);
  // } ,[])


  // if(token)

  const { token, login, logout, user } = useAuth();
  console.log(user)

  return (
    <UserContext.Provider value = {{user,login,logout,token}}>
    <Routes>
    <Route path = "/" element = {!!token ? <Home/> : <Login/> }/>
      {/* <Route path = "/" element = {<Home/>}/> */}
      <Route path = "/register" element = {!!token ? <Home/> : <Register/> }/>
    </Routes>
    </UserContext.Provider>
  );
}

export default App;
