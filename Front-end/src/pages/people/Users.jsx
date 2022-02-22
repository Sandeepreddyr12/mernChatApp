import {useEffect,useState,useContext} from 'react';
import axios from 'axios';

import { UserContext } from '../../context/userContext';
import People from './component/people';
import './users.css'

const Users = props => {
  const [users, setusers] = useState([]);
  const {user : owner} = useContext(UserContext);
  

  useEffect(() => {
    axios.get(`http://localhost:5000/profile/${owner?.userId}`, {headers : { Authorization : `Bearer ${owner?.token}`}})
    .then(a =>{
      setusers(a.data.users)
      console.log(a.data.users);
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
    <div className="PeopleContainer">
      {users.map(a => (
         <People
          key={a.id}
          id={a.id}
          // image={user.image}
          name={a.name}
          image = {a.image}
          userId = {owner}
        />
      ))}
    </div>
  );
};


export default Users;