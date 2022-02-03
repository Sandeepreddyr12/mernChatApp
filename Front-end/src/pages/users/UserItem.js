import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

// import Avatar from '../../shared/components/UIElements/Avatar';
import './UserItem.css';


const UserItem = props => {
  const newConversationHandler = () =>{
    const newConversation = {
        name:`${props.name} &   ${props.userId.name}`,
        id1:props.userId.id,
        id2:props.id
    }

    axios.post("http://localhost:5000/",newConversation)
    .then((a) =>{
      console.log(a)
    })
    .catch((err) =>{console.log(err)})
  }
  return (
    <li className="user-item">
        <Link to={`/`}>
          <div className="user-item__image">
            {/* <Avatar image={props.image} alt={props.name} /> */}
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <div on onClick={newConversationHandler}><button>+</button></div>
          </div>
        </Link>
    </li>
  );
};

export default UserItem;
