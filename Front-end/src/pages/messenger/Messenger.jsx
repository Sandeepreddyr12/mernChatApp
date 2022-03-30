import React, { useState, useEffect, useContext,useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { toast } from "react-toastify";



import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
// import UsersList from "../users/UsersList";
import { UserContext } from "../../context/userContext";
import Spinner from "../../components/spinner/Spinner";

let socket;
const ENDPOINT = process.env.REACT_APP_SOCKET_END;

export default function Messenger() {

  const [conversations, setconversations] = useState(null);
  const [currentChat, setcurrentChat] = useState(null);
  const [chatData, setchatData] = useState(null);
  const [newMessage, setnewMessage] = useState("");
  const [ArrivalMessage, setArrivalMessage] = useState(null);
  const [fakeState, setfakeState] = useState(null);
  const [loading, setloading] = useState(false);
  const [modal, setmodal] = useState(false)
  const [XbtnId, setXbtnId] = useState()
  // const [UserId, setUserId] = useState(null);

  const { user: owner, token } = useContext(UserContext);

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("addUser", owner?.userId);
  }, []);

  useEffect(() => {

    ArrivalMessage &&
      (currentChat?.userId1 === ArrivalMessage.sender ||
        currentChat?.userId1 === ArrivalMessage.receiver) &&
      setchatData([...chatData, ArrivalMessage]);
  }, [ArrivalMessage]);

  useEffect(() => {
    setloading(true);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}${owner?.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((a) => {
        setconversations(a.data);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
      });
  }, [fakeState]);


  useEffect(() => {

    // socket.emit("join chat", currentChat?._id);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}chat/${currentChat?._id}`)
      .then((a) => {
        setchatData(a.data);
      })
      .catch((err) => {});
  }, [currentChat]);

  const newMessageHandler = () => {
    if(newMessage.trim() === ''){
      return
    }
    const postmessage = {
      id: currentChat._id,
      sender: owner?.userId,
      receiver:
        owner?.userId === currentChat.userId2
          ? currentChat.userId1
          : currentChat.userId2,
      message: newMessage,
    };

    socket.emit("sendMessage", postmessage);

    axios
      .post(process.env.REACT_APP_BACKEND_URL+"chat/", postmessage)
      .then((a) => {
        setchatData([...chatData, a.data]);
        setnewMessage("");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        conversationId: data.id,
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);





  const deleteConversationHandler = (id, token) => {


    

    setloading(true);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((a) => {
        setfakeState(a);
        setloading(false);
        setmodal(false)
        toast.dismiss();
        toast.success(`Conversation Deleted`);
        if(currentChat?._id === id){setcurrentChat(null)}
      })
      .catch((err) => {
        setmodal(false)
        setloading(false);
        toast.dismiss();
        toast.error( `error occured.... 😫`)
      });
  };




  let conversationss = conversations?.length ? (
    conversations.map((a) => (
      <div className="conversations" >
        <div onClick={() => setcurrentChat(a)} key={a._id}>
          <Conversation data={a}  />
        </div>
        <Modal isOpen = {modal} onRequestClose = {() =>{setmodal(false)}}   className="Modal"
           overlayClassName="Overlay">
             {
               !loading  ? (
                <div className="modalbody">
                   <div className="message">
                     <div className="warnTitle">Are you sure ?</div>
                     <div className="warning">Do you really want to delete conversation & it's messages? This process cannot be undone.  </div>
                   </div>
                 <div className="buttons">
                  <button className="signinButton" type="button" onClick={() => {setmodal(false)}}  style= {{width : "30%", borderRadius : "10px"}}>Cancel</button>
                  <button className="registerButton" type='button' onClick={() => deleteConversationHandler(XbtnId, token)}  style= {{width : "30%", fontSize : "1.2rem"}}>Delete</button>
                  </div>
                </div>
      ) : <Spinner/>
             }
           </Modal>
        <div
          className="button"
          onClick={() => {
            setmodal(true); 
            setXbtnId(a._id)
          }}
        >
           
          <button>❌</button>
        </div>
      </div>
    ))
  ) : (
    <div className="noConversationText">no conversations</div>
  );

  if (loading) {
    conversationss = <Spinner />;
  }

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="userProfile">
            <Link to="/profile">
            <div className="profile_img">
              <img
                src={`${process.env.REACT_APP_S3_URL}${owner?.profile}`}
                alt="profile card"
              />
            </div>
            </Link>
            <div className="title"> <span> {owner?.name}</span> here</div>
          </div>
          <div className="chatMenuWrapper">{conversationss}</div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatting">
                  {chatData.map((a) => (
                    <div className="chatBoxTop" key={a._id} ref = {setRef}>
                      <Message
                        data={a}
                        userId={owner?.userId}
                        profile={owner?.profile}
                        conversation={currentChat}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    value={newMessage}
                    onChange={(e) => setnewMessage(e.target.value)}
                    placeholder="enter msg here"
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={newMessageHandler}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
                <div className="info">
                  Welcome to the MERN Chat, by
                  <div>
                    <b> Sandeep reddy </b>
                  </div>
                </div>
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
