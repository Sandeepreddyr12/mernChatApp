import {useEffect,useState,useContext} from 'react';
import axios from 'axios';

import UserItem from './UserItem';
import './UsersList.css';
import { UserContext } from '../../context/userContext';

const UsersList = props => {
  const [users, setusers] = useState([]);
  const {user : owner} = useContext(UserContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/profile/${owner?.user?._id}`)
    .then(a =>{
      setusers(a.data.users)
      console.log(users);
    })
    .catch(err =>{
      console.log(err)
    })
    
  },[]);

  // console.log(users)
  // console.log(user, "user")

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
          userId = {owner?.user}
        />
      ))}
    </ul>
  );
};

export default UsersList;
