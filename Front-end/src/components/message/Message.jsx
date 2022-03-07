import { format } from "timeago.js";

import "./message.css";

export default function Message(props) {
  console.log(props.data)
  let profile = props.data.sender === props.conversation.userId1 ? props.conversation.profile1 : props.conversation.profile2;

  return (
    <div className={props.data.sender === props.userId ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={`${process.env.REACT_APP_BACKEND_URL}${profile}`}
          alt="i"
        />
        <p className="messageText">{props.data.message}</p>
      </div>
      <div className="messageBottom">{format(props.data.createdAt)}</div>
    </div>
  );
}
