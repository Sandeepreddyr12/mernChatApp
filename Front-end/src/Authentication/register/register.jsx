import {useRef,useState,useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";


import "../login/login.css";
import Spinner from "../../components/spinner/Spinner";
import { UserContext } from '../../context/userContext';
import ImageUpload from "../../components/imageupload/ImageUpload";


export default function Register() {

  const {login,logout} = useContext(UserContext);

  const [loading, setLoading] = useState(false);
   
  const username = useRef();
  const email = useRef();
  const password = useRef();

  let image;
  let fileIsValid;

  const InputHandler = ( pickedFile, fileIsValid) =>{
    console.log(pickedFile);
    return (
      image = pickedFile,
      fileIsValid = fileIsValid
    )
  }



  const registerHandler =  (e) => {
    e.preventDefault();
    console.log(image)
     
      const formData = new FormData();
      formData.append('name', username.current.value);
      formData.append('email', email.current.value);
      formData.append('password', password.current.value);
      formData.append('image', image);
      
      setLoading(true)

      toast.loading("wait a moment ⌛, ur about to join us");


        axios.post(process.env.REACT_APP_BACKEND_URL+"profile/signup", formData, {headers : { "Content-Type": "multipart/form-data" }})
        .then((a) => {
          console.log(a.data);
          login(a.data,a.data.token)
          setLoading(false)
          // history.push("/login")
          toast.dismiss();
        toast.success(`welcome ${a?.data?.name ? a?.data?.name : 'here'} , thank u joining us`);
        })
        .catch ((err) => {
          logout(null)
          setLoading(false)
          toast.dismiss();
          toast.error( `${err?.response?.data?.message}  😫`)
        });
  };


  let formComponent= (
    <>
    <span className='header'>Sign.Up Here</span>
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
              <ImageUpload onInput = {(pickedFile,fileIsValid) => InputHandler(pickedFile,fileIsValid)}/>
            <button className="signinButton" type="submit">Sign Up</button>
            <button className="registerButton" type='button'>
            <Link to="/"> Log into Account</Link>
            </button>
    </>
  )

  if(loading){
    formComponent =<Spinner/>
  }
  



  return (
    <div className="login">
          <form className="loginBox" onSubmit={registerHandler}>
          {formComponent}
          </form>
    </div>
  );
}
