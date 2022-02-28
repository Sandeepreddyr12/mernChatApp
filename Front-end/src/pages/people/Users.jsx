import {useEffect,useState,useContext} from 'react';
import axios from 'axios';

import { UserContext } from '../../context/userContext';
import People from './component/people';
import Spinner from '../../components/spinner/Spinner';
import './users.css'

const Users = props => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false)
  const {user : owner} = useContext(UserContext);
  

  useEffect(() => {
    setloading(true)
    axios.get(`http://localhost:5000/profile/${owner?.userId}`, {headers : { Authorization : `Bearer ${owner?.token}`}})
    .then(a =>{
      setusers(a.data.users)
      setloading(false)
      // console.log(a.data.users);
    })
    .catch(err =>{
      setloading(false)
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

  let people;

  people = loading ? <Spinner/> : (
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

  return people
};


export default Users;