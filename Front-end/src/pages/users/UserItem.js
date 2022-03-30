import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

// import Avatar from '../../shared/components/UIElements/Avatar';
import './UserItem.css';


const UserItem = props => {
  const newConversationHandler = () =>{
    const newConversation = {
        name:`${props.name} &   ${props.userId.name}`,
        id1:props.userId.userId,
        id2:props.id,
        profile1 : props.userId.profile,
        profile2 : props.image,
    }

    axios.post(process.env.REACT_APP_BACKEND_URL,newConversation, {headers : { Authorization : `Bearer ${props.userId.token}`}})
    .then((a) =>{
    })
    .catch((err) =>{})
  }
  return (
    <li className="user-item">
        <Link to={`/`}>
          <div className="user-item__image">
            {/* <Avatar image={props.image} alt={props.name} /> */}
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <div on onClick={newConversationHandler} className = "button"><button>+</button></div>
          </div>
        </Link>
    </li>
  );
};

export default UserItem;
