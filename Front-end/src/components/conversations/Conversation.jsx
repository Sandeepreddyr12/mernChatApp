import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";

export default function Conversation(props) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   const friendId = conversation.senderId;

  //   const getUser = async () => {
  //     try {
  //       const res = await axios("/users?userId=" + friendId);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  

  return (
    <div className="conversation">
    <div class="leaderboard">
  
  <div class="leaderboard__profiles">
    <div class="leaderboard__profile">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mark Zuckerberg" class="leaderboard__picture"/>
      <span class="leaderboard__name">{props.data.name}</span>
    </div>
  </div>
</div>
    </div>
  );
}
