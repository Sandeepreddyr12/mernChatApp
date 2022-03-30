
import React, { Suspense } from 'react'; 

import {Routes,Route,Navigate} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Login from "./Authentication/login/Login";
import Register from "./Authentication/register/register";
// import Home from "./home/Home";
// import Profile from "./pages/profile/profile";
// import Users from "./pages/people/Users";
import { UserContext }  from "./context/userContext";
import { useAuth } from "./Authentication/authHook/auth-hook";
import Navbar from "./components/navigation/navbar";
import Spinner from "./components/spinner/Spinner";
import "./app.css"

const Users = React.lazy(() => import("./pages/people/Users"))
const Profile = React.lazy(() => import("./pages/profile/profile"))
const Home = React.lazy(() => import("./home/Home"))



function App() {

  const { token, login, logout, user } = useAuth();


  return (
    <UserContext.Provider value = {{user,login,logout,token}}>
      <div  style={{backgroundColor : "#ecc7c7" }}>
      <ToastContainer autoClose={3000} hideProgressBar/>
      {!!token ? <Navbar/>: ""} 
      <Suspense fallback = {<Spinner/>}>
    <Routes>
    <Route path = "/" element = {!!token ? <Home/> : <Login/> }/>
       <Route path = "/profile" element = {!!token ? <Profile/> : <Navigate replace to = "/" />}/>
       <Route path = "/people" element = {!!token ? <Users/> : <Navigate replace to = "/" />}/>
      <Route path = "/register" element = {!!token ? <Home/> : <Register/> }/> 
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }/>
    </Routes>
    </Suspense>
    </div>
    </UserContext.Provider>
  );
}

export default App;
