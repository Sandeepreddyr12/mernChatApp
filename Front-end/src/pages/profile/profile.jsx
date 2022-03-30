import {useContext,useState,useRef} from 'react'
import Modal from 'react-modal';
import axios from "axios";
import { toast } from "react-toastify";



import { UserContext } from '../../context/userContext'
import ImageUpload from '../../components/imageupload/ImageUpload';
import './profile.css'
import Spinner from '../../components/spinner/Spinner';


export default function Profile() {

  const {user,login,logout,token} = useContext(UserContext);

  const [modal, setmodal] = useState(false)
  const [loading, setLoading] = useState(false);


  const username = useRef();
  let image;
  let fileIsValid;

  const InputHandler = ( pickedFile, fileIsValid) =>{
    return (
      image = pickedFile,
      fileIsValid = fileIsValid
    )
  }




  const updateHandler =  (e) => {
    e.preventDefault();
   
     
      const formData = new FormData();
      formData.append('name', username.current.value);
      formData.append('image', image);
      
      setLoading(true)

        axios.patch(`${process.env.REACT_APP_BACKEND_URL}profile/${user?.userId}`, formData, {headers : { "Content-Type": "multipart/form-data", Authorization : `Bearer ${token}` }})
        .then((a) => {
          login(a.data,a.data.token)
          setLoading(false)
          setmodal(false)
          toast.dismiss()
          toast.success(`Update Successful`,{position: "bottom-center",theme : 'dark', autoClose: 2000});
        })
        .catch ((err) => {
        setLoading(false)
        setmodal(false)
        toast.dismiss()
        toast.error( `${err?.response?.data?.message}  😫`)
        });
  };


    let formComponent = (
      <>
        <span className='header'>Update Profile </span>
        <input placeholder="Username" ref={username} type = "text" className="loginInput" />
        <ImageUpload onInput = {(pickedFile,fileIsValid) => InputHandler(pickedFile,fileIsValid)}/>
        <button className="signinButton" type="submit">Update</button>
        <button className="registerButton" onClick={() => {setmodal(false)}}>
        Cancel
        </button>
      </>
    )
  
    if(loading){
      formComponent = <Spinner/>
    }


  return (
        <div className ="wrapper">
  <div className ="profile-card js-profile-card">
    <div className ="profile-card__img">
      <img src= {`${process.env.REACT_APP_S3_URL}${user?.profile}`} alt="profile card"/>
    </div>

    <div className ="profile-card__cnt js-profile-cnt">
      <div className ="profile-card__name">{user?.name || "guest"}</div>
      <div className ="profile-card__txt">Mern stack developer <strong>India</strong></div>

    <Modal isOpen = {modal} onRequestClose = {() =>{setmodal(false)}}   className="Modal"
           overlayClassName="Overlay">
    <div className="login" style={{width : "100%", height : "100%",background : "white"}}>
          <form className="loginBox" onSubmit={updateHandler}>
          {formComponent}
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
