import {useContext,useState,useRef} from 'react'
import Modal from 'react-modal';
import axios from "axios";


import { UserContext } from '../../context/userContext'
import ImageUpload from '../../components/imageupload/ImageUpload';
import './profile.css'

export default function Profile() {

  const {user,login,logout,token} = useContext(UserContext);

  const [modal, setmodal] = useState(false)
  const [loading, setLoadin] = useState(false);


  const username = useRef();
  let image;
  let fileIsValid;

  const InputHandler = ( pickedFile, fileIsValid) =>{
    console.log(pickedFile);
    return (
      image = pickedFile,
      fileIsValid = fileIsValid
    )
  }

  console.log(user)



  const updateHandler =  (e) => {
    console.log("update handler")
    e.preventDefault();
    console.log(image)
    console.log(username.current.value)

     
      const formData = new FormData();
      formData.append('name', username.current.value);
      formData.append('image', image);
      
      console.log(formData);

        axios.patch(`http://localhost:5000/profile/${user?.userId}`, formData, {headers : { "Content-Type": "multipart/form-data", Authorization : `Bearer ${token}` }})
        .then((a) => {
          console.log(a.data);
          login(a.data,a.data.token)
          setLoadin(false)
          setmodal(false)
        })
        .catch ((err) => {
          // logout(null)
          setLoadin(false)
        console.log(err);
        setmodal(false)
        });
  };


  


  return (
        <div className ="wrapper">
  <div className ="profile-card js-profile-card">
    <div className ="profile-card__img">
      <img src= {`http://localhost:5000/${user?.profile}`} alt="profile card"/>
    </div>

    <div className ="profile-card__cnt js-profile-cnt">
      <div className ="profile-card__name">{user?.name || "guest"}</div>
      <div className ="profile-card__txt">Mern stack developer <strong>India</strong></div>

    <Modal isOpen = {modal} onRequestClose = {() =>{setmodal(false)}}>
    <div className="login">
          <form className="loginBox" onSubmit={updateHandler}>
            <input placeholder="Username" ref={username} type = "text" className="loginInput" />
              <ImageUpload onInput = {(pickedFile,fileIsValid) => InputHandler(pickedFile,fileIsValid)}/>
            <button className="signinButton" type="submit">Update</button>
            <button className="registerButton" onClick={() => {setmodal(false)}}>
            Cancel
            </button>
          </form>
    </div>
    </Modal>

      <div className ="profile-card-ctr">
        <button className ="profile-card__button button--blue js-message-btn" onClick={() => {setmodal(true)}}>Edit profile</button>
        <button className ="profile-card__button button--orange" onClick={logout}>Log out</button>
      </div>
    </div>


  </div>

</div>
  )
}
