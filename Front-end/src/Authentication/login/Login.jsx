import  {useRef,useContext,useState,useEffect} from 'react';
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";


import { UserContext } from '../../context/userContext';
import Spinner from '../../components/spinner/Spinner';
import "./login.css";

export default function Login() {
  const {user,login,logout} = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 


  const email = useRef();
  const password = useRef();

useEffect(() => {
  if(user){
    navigate("/", {replace : true});
  }
  
}, [loading,user]);


const axiosLogin = (user) => {
      
  axios.post(process.env.REACT_APP_BACKEND_URL+"profile/login", user)
  .then((a) => {
    login(a.data,a.data.token);
    setLoading(false);
    toast.dismiss();
  toast.success(`welcome back  ${a?.data?.name ? a?.data?.name : 'here'}`);
  })
  .catch ((err) => {
    logout(null)
    setLoading(false)

    toast.dismiss();
    toast.error( `${err?.response?.data?.message}  😫`)
  });
}


  
  const loginHandler =  (e) => {
    e.preventDefault();
      const user = {
        email: email.current.value,
        password: password.current.value,
      }

      toast.loading("wait a moment ⌛, ur about to join us");
      setLoading(true)

      axiosLogin(user);
  };


  const guestLogin = () =>{
    const user = {
      email: "test@test.com",
      password: "123456",
    }

    axiosLogin(user);

  }

    

  let formComponent = (
    <>
  <span className='header'>LOGIN HERE</span>
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
  <button className="registerButton" type='button'>
  <Link to="/register">Create a New Account</Link>
  </button>
  <button className="registerButton" type='button' style={{backgroundColor : "#5e2becd5", width : "50%", marginTop : "1rem"}}
  onClick = {guestLogin}
  >
  Login as  Guest
  </button>
  </>)

if(loading){
  formComponent =<Spinner/>
}


  return (
    <div className="login">
      <div className='backgroundTxt'><span>M-E-R-N</span> Chat App</div>
      <form className="loginBox" onSubmit={loginHandler}>
          {formComponent}
          </form>
    </div>
  );
}
