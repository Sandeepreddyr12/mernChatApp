import React, {useState, useEffect,useContext,useRef} from "react";
import axios from "axios";
import io from "socket.io-client";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import UsersList from "../users/UsersList";
import { UserContext } from "../../context/userContext";
// import ChatOnline from "../../components/chatOnline/ChatOnline";


let socket;
  const ENDPOINT = "http://localhost:5000"; 

export default function Messenger() {
  
  // const scrollRef = useRef();

  const [conversations, setconversations] = useState(null)
  const [currentChat, setcurrentChat] = useState(null)
  const [chatData, setchatData] = useState(null)
  const [newMessage, setnewMessage] = useState("")
  const [ArrivalMessage, setArrivalMessage] = useState(null);
  // const [UserId, setUserId] = useState(null);
  // const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  

  
  const {user : owner,token} = useContext(UserContext);

  

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("addUser", owner?.userId);

  },[]);

  
  
  

  useEffect(() => {
    console.log("data");

    console.log(ArrivalMessage);

    ArrivalMessage && ( currentChat?.userId1 == ArrivalMessage.sender || currentChat?.userId1 == ArrivalMessage.receiver) && setchatData([...chatData, ArrivalMessage]);
    // console.log(chatData);
  }, [ArrivalMessage]);


  useEffect(() => {
    // console.log(owner)

    axios.get(`http://localhost:5000/${owner?.userId}`, {headers : { Authorization : `Bearer ${token}`}})
    .then(a => {
      setconversations(a.data)
    })
    .catch(err => console.log(err))
    
  }, [])
  
  // console.log(owner.user) 
  
  useEffect(() => {
    // console.log(currentChat?._id)
    
    // socket.emit("join chat", currentChat?._id);
    axios.get(`http://localhost:5000/chat/${currentChat?._id}`)
    .then(a => {
      setchatData(a.data)
      // console.log(chatData)
    })
    .catch(err => console.log(err))
    
  }, [currentChat])

  

  const newMessageHandler = () => {

    const postmessage = {
        id : currentChat._id,
        sender : owner?.userId,
        receiver : owner?.userId == currentChat.userId2 ? currentChat.userId1 : currentChat.userId2,
        message : newMessage
    }

    socket.emit("sendMessage", postmessage);

    axios.post("http://localhost:5000/chat/",postmessage)
   .then(a => {
    console.log(a.data)
    // console.log("postmessage")
    setchatData([...chatData,a.data])
    setnewMessage("")
  })
  .catch(err => console.log(err))
  }

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(data,"data");
      setArrivalMessage({
        conversationId : data.id,
        sender : data.sender,
        receiver : data.receiver,
        message : data.message
      });
    });
  },[]);

  const deleteConversationHandler = (id,token) =>{
    axios.delete(`http://localhost:5000/${id}`, {headers : { Authorization : `Bearer ${token}`}})
    .then( a => {
      console.log(a)
    })
    .catch( err =>{
      console.log(err)
    })
  }

  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);




  return (
    <>
    <div className="userProfile">
       <div className ="profile_img">
      <img src= {`http://localhost:5000/${owner?.profile}`} alt="profile card"/>
    </div>
      <div className="title">{owner?.name} here</div>
    </div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">           
            {
             conversations ? conversations.map(a => <div className="conversations"> <div onClick={() => setcurrentChat(a)} key={a._id}><Conversation  data = {a}/></div>
             <div on onClick={() => deleteConversationHandler(a._id, token)} className = "button"><button>❌</button></div>
             </div>) : <div className="noConversationText">no conversations</div>
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper"> 
            {currentChat ?  (
              <>
              {chatData.map(a =>  <div className="chatBoxTop" key={a._id}> 
              <Message data = {a} userId = { owner?.userId} profile = {owner?.profile} conversation = {currentChat}/>
              </div>)}
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    value={newMessage}
                    onChange={(e) => setnewMessage(e.target.value)}
                    placeholder="enter msg here"
                  ></textarea>
                  <button className="chatSubmitButton" onClick={newMessageHandler}>
                    Send
                  </button>
                </div>
              </>
             ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )} 
          </div>
        </div>
        {/* <div className="users">
                <UsersList/>
        </div> */}
      </div>
    </>
  );
}
