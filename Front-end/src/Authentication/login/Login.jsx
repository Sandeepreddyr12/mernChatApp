import  {useRef,useContext,useState,useEffect} from 'react';
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';


import { UserContext } from '../../context/userContext';
import Spinner from '../../components/spinner/Spinner';
import "./login.css";

export default function Login() {
  const {user,login,logout} = useContext(UserContext);

  const [loading, setLoadin] = useState(false);

  const navigate = useNavigate();

 


  const email = useRef();
  const password = useRef();

useEffect(() => {
  if(user){
    navigate("/", {replace : true});
  }
  
}, [loading]);


  
  const loginHandler =  (e) => {
    e.preventDefault();
      const user = {
        email: email.current.value,
        password: password.current.value,
      }
      setLoadin(true)

        axios.post("http://localhost:5000/profile/login", user)
        .then((a) => {
          // console.log(a.data);
          login(a.data,a.data.token);
          setLoadin(false);
        })
        .catch ((err) => {
          logout(null)
          setLoadin(false)
        console.log(err);
        });
  };

  // console.log(user)


  return (
    <div className="login">
          <form className="loginBox" onSubmit={loginHandler}>
            <input  placeholder="Email"
              type="email"
              required
              ref={email}
               className="loginInput" />
            <input placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
               className="loginInput" />
            <button className="signinButton" type="submit">Sign In</button>
            <button className="registerButton">
            <Link to="/register">Create a New Account</Link>
            </button>
          </form>
    </div>
  );
}
