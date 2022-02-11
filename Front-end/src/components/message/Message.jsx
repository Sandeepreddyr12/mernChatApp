// import { format } from "timeago.js";

import "./message.css";

export default function Message(props) {
  console.log(props.profile);
  return (
    <div className={ props.sender ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={`http://localhost:5000/${props.profile}`}
          alt=""
        />
        <p className="messageText">{props.data.message}</p>
      </div>
      <div className="messageBottom">time</div>
    </div>
  );
}
