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
// const backEnd = "http://localhost:5000";

export default function Messenger() {
  
  // const scrollRef = useRef();

  const [conversations, setconversations] = useState(null)
  const [currentChat, setcurrentChat] = useState(null)
  const [chatData, setchatData] = useState(null)
  const [newMessage, setnewMessage] = useState(null)
  const [ArrivalMessage, setArrivalMessage] = useState(null);
  // const [UserId, setUserId] = useState(null);
  // const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  

  
  const {user : owner} = useContext(UserContext);

  

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("addUser", owner?.user.id);

  },[]);

  
  
  

  useEffect(() => {
    console.log("data");

    console.log(ArrivalMessage);

    ArrivalMessage && ( currentChat?.userId1 == ArrivalMessage.sender || currentChat?.userId1 == ArrivalMessage.receiver) && setchatData([...chatData, ArrivalMessage]);
    console.log(chatData);
  }, [ArrivalMessage]);


  useEffect(() => {
    
    axios.get("http://localhost:5000/")
    .then(a => {
      setconversations(a.data)

      
      // console.log(currentChat);
      // console.log(a.data) 
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
        sender : owner?.user?.id,
        receiver : owner?.user?.id == currentChat.userId2 ? currentChat.userId1 : currentChat.userId2,
        message : newMessage
    }

    socket.emit("sendMessage", postmessage);

    axios.post("http://localhost:5000/chat/",postmessage)
   .then(a => {
    console.log(a.data)
    // console.log("postmessage")
    setchatData([...chatData,a.data])
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

  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);




  

 
//////////////////////////////////////


// const fetchMessages = async () => {
//   if (!selectedChat) return;

//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     };

//     setLoading(true);

//     const { data } = await axios.get(
//       `/api/message/${selectedChat._id}`,
//       config
//     );
//     setMessages(data);
//     setLoading(false);

//     socket.emit("join chat", selectedChat._id);
//   } catch (error) {
//     toast({
//       title: "Error Occured!",
//       description: "Failed to Load the Messages",
//       status: "error",
//       duration: 5000,
//       isClosable: true,
//       position: "bottom",
//     });
//   }
// };

// const sendMessage = async (event) => {
//   if (event.key === "Enter" && newMessage) {
//     socket.emit("stop typing", selectedChat._id);
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       setNewMessage("");
//       const { data } = await axios.post(
//         "/api/message",
//         {
//           content: newMessage,
//           chatId: selectedChat,
//         },
//         config
//       );
//       socket.emit("new message", data);
//       setMessages([...messages, data]);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to send the Message",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   }
// };

// useEffect(() => {
//   socket = io(ENDPOINT);
//   socket.emit("setup", user);
//   socket.on("connected", () => setSocketConnected(true));
//   socket.on("typing", () => setIsTyping(true));
//   socket.on("stop typing", () => setIsTyping(false));

//   // eslint-disable-next-line
// }, []);

// useEffect(() => {
//   fetchMessages();

//   selectedChatCompare = selectedChat;
//   // eslint-disable-next-line
// }, [selectedChat]);

// useEffect(() => {
//   socket.on("message recieved", (newMessageRecieved) => {
//     if (
//       !selectedChatCompare || // if chat is not selected or doesn't match current chat
//       selectedChatCompare._id !== newMessageRecieved.chat._id
//     ) {
//       if (!notification.includes(newMessageRecieved)) {
//         setNotification([newMessageRecieved, ...notification]);
//         setFetchAgain(!fetchAgain);
//       }
//     } else {
//       setMessages([...messages, newMessageRecieved]);
//     }
//   });
// });

// const typingHandler = (e) => {
//   setNewMessage(e.target.value);

//   if (!socketConnected) return;

//   if (!typing) {
//     setTyping(true);
//     socket.emit("typing", selectedChat._id);
//   }
//   let lastTypingTime = new Date().getTime();
//   var timerLength = 3000;
//   setTimeout(() => {
//     var timeNow = new Date().getTime();
//     var timeDiff = timeNow - lastTypingTime;
//     if (timeDiff >= timerLength && typing) {
//       socket.emit("stop typing", selectedChat._id);
//       setTyping(false);
//     }
//   }, timerLength);
// };







  

  return (
    <>
    <div style={{marginTop : "20px", }}>
      {/* <input type="text" placeholder="enter id here" 
        onChange={(e) => setUserId(e.target.value)}
      /> */}
      <div>hi there I'm {owner?.user?.name}</div>
    </div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
           
            {
             conversations ? conversations.map(a =><div onClick={() => setcurrentChat(a)} key={a._id}><Conversation  name = {a.name}/></div>) : <div className="noConversationText">no conversations</div>
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper"> 
            {currentChat ?  (
              <>
              {chatData.map(a =>  <div className="chatBoxTop" key={a._id}> 
              <Message data = {a} sender = {a.sender === owner?.user?.id}/>
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
        <div className="users">
                <UsersList/>
        </div>
      </div>
    </>
  );
}
