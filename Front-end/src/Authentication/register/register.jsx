import {useRef,useState,useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../login/login.css";
import { UserContext } from '../../context/userContext';
import ImageUpload from "../../components/imageupload/ImageUpload";


export default function Register() {

  const {login,logout} = useContext(UserContext);

  const [loading, setLoadin] = useState(false);
   
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
      
      console.log(formData);

        axios.post("http://localhost:5000/profile/signup", formData, {headers : { "Content-Type": "multipart/form-data" }})
        .then((a) => {
          console.log(a.data);
          login(a.data,a.data.token)
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
              <ImageUpload onInput = {(pickedFile,fileIsValid) => InputHandler(pickedFile,fileIsValid)}/>
            <button className="signinButton" type="submit">Sign Up</button>
            <button className="registerButton">
            <Link to="/"> Log into Account</Link>
            </button>
          </form>
    </div>
  );
}
