import {useRef,useState,useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../login/login.css";
import { UserContext } from '../../context/userContext';


export default function Register() {

  const {user,login,logout} = useContext(UserContext);

  const [loading, setLoadin] = useState(false);
   
  const username = useRef();
  const email = useRef();
  const password = useRef();




  const registerHandler =  (e) => {
    e.preventDefault();
      const user = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      console.log(user);
        axios.post("http://localhost:5000/profile/signup", user)
        .then((a) => {
          console.log(a.data);
          login(a.data)
          setLoadin(false)
          // history.push("/login")
        })
        .catch ((err) => {
          logout(null)
          setLoadin(false)
        console.log(err);
        });
  };

  return (
    <div className="login">
          <form className="loginBox" onSubmit={registerHandler}>
            <input placeholder="Username" ref={username} className="loginInput" />
            <input  placeholder="Email"
              type="email"
              required
              ref={email}
               className="loginInput" />
            <input placeholder="Password"
              type="password"
              required
              ref={password}
              minLength="6" className="loginInput" />
            <button className="signinButton" type="submit">Sign Up</button>
            <button className="registerButton">
            <Link to="/"> Log into Account</Link>
            </button>
          </form>
    </div>
  );
}
