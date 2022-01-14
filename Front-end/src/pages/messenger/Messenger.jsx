import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";

export default function Messenger() {
  
  // const scrollRef = useRef();

  const [conversations, setconversations] = useState(null)
  const [currentChatId, setcurrentChatId] = useState(null)
  const [chatData, setchatData] = useState(null)
  const [newMessage, setnewMessage] = useState(null)
  const [UserId, setUserId] = useState(null);


  useEffect(() => {
    
    axios.get("http://localhost:5000/")
    .then(a => {
      setconversations(a.data)

      
      console.log(a.data) 
    })
    .catch(err => console.log(err))
    
    console.log(conversations) 
  }, [])
  

  
  
useEffect(() => {
    
    axios.get(`http://localhost:5000/chat/${currentChatId}`)
    .then(a => {
      setchatData(a.data)
    })
    .catch(err => console.log(err))
    console.log(chatData) 
    
  }, [currentChatId])


  
 


  const newMessageHandler = () => {
    console.log(currentChatId)

    const postmessage = {
        id : currentChatId,
        sender : UserId,
        message : newMessage
    }

   axios.post("http://localhost:5000/chat/",postmessage)
   .then(a => {
    console.log(a.data)
  })
  .catch(err => console.log(err))
  }

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);



  return (
    <>
    <div style={{marginTop : "20px", }}>
      <input type="text" placeholder="enter id here" 
        onChange={(e) => setUserId(e.target.value)}
      />
    </div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
           
            {
             conversations ? conversations.map(a =><div onClick={() => setcurrentChatId(a._id)} key={a._id}><Conversation  name = {a.name}/></div>) : <div className="noConversationText">no conversations</div>
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChatId ?  (
              <>
              {chatData.map(a =>  <div className="chatBoxTop" key={a._id}> 
              <Message data = {a} sender = {a._id === UserId}/>
              </div>)}
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
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
      </div>
    </>
  );
}
