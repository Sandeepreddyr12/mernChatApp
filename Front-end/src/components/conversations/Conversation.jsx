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
    // <div className="conversation">
    //   <img
    //     className="conversationImg"
    //     src={
    //       user?.profilePicture
    //         ? PF + user.profilePicture
    //         : PF + "person/noAvatar.png"
    //     }
    //     alt=""
    //   />
    //   <span className="conversationName">{user?.username}</span>
    <div className="conversation">
    <div className="conversationName">{props.data.name}</div>
    </div>
  );
}
