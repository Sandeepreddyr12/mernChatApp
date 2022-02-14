// import { format } from "timeago.js";

import "./message.css";

export default function Message(props) {
  let profile = props.data.sender === props.conversation.userId1 ? props.conversation.profile1 : props.conversation.profile2;

  return (
    <div className={props.data.sender === props.userId ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={`http://localhost:5000/${profile}`}
          alt=""
        />
        <p className="messageText">{props.data.message}</p>
      </div>
      <div className="messageBottom">time</div>
    </div>
  );
}
