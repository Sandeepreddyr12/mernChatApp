import {useEffect,useState,useContext} from 'react';
import axios from 'axios';

import UserItem from './UserItem';
import './UsersList.css';
import { UserContext } from '../../context/userContext';

const UsersList = props => {
  const [users, setusers] = useState([]);
  const {user : owner} = useContext(UserContext);
  

  useEffect(() => {

const controller = new AbortController();

    axios.get(`${process.env.REACT_APP_BACKEND_URL}profile/${owner?.userId}`, {headers : { Authorization : `Bearer ${owner.token}`},signal: controller.signal})
    .then(a =>{
      setusers(a.data.users)
    })
    .catch(err =>{
    })

    return () => {
      controller.abort();
    };
    
  },[]);


  if (users.length === 0) {
    return (
      <div className="center">
          <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {users.map(a => (
         <UserItem
          key={a.id}
          id={a.id}
          // image={user.image}
          name={a.name}
          image = {a.image}
          userId = {owner}
        />
      ))}
    </ul>
  );
};

export default UsersList;
