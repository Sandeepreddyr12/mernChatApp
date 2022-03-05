import { useEffect, useState,useContext } from "react";
import axios from "axios";


import "./conversation.css";
import { UserContext } from "../../context/userContext";

export default function Conversation(props) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [User, setUser] = useState(null)
  const [activeStyle, setactiveStyle] = useState({})

  const {user : owner} = useContext(UserContext);

  let ID = owner?.userId === props.data?.userId1 ? props.data?.userId2 : props.data?.userId1

  useEffect(() => {



    const getUser = async () => {
      try {
        const res = await axios(`http://localhost:5000/profile/user/${ID}`, {headers : { Authorization : `Bearer ${owner?.token}`}});
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  //style={props.activeStyle ? {borderLeft : "3px solid red"} : {}}

  return (
    <div className="conversation" style={activeStyle} onClick={()=> setactiveStyle({borderLeft : "3px solid red"})}>
    <div class="leaderboard">
  <div class="leaderboard__profiles">
    <div class="leaderboard__profile">
      <img src={`http://localhost:5000/${User?.image}`} alt="" class="leaderboard__picture"/>
      <span class="leaderboard__name">{props.data.name}</span>
    </div>
  </div>
</div>
    </div>
  );
}
