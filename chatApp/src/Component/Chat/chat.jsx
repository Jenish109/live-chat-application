import React, { useEffect, useState } from "react";
import { user } from "../Join/join";
import socketIo from "socket.io-client";
import "./chat.css";
import sendLogo from "../../images/send.png";
import Message from "../message/message";
import closeIcon from "../../images/delete.png"
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4500/";

const chat = () => {
  
  const [id, setId] = useState("");
  const [msgs,setMsg] = useState([])

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMsg([...msgs,data]);
      console.log(data.user, data.message);
    });
    socket.on(`userJoined`, (data) => {
      setMsg([...msgs,data]);

      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMsg([...msgs,data]);

      console.log(data.user, data.message);
    });
    return () => {
      // socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) =>{ 
      setMsg([...msgs,data]);

      console.log(data.user, data.message, data.id)
    });
    return()=>{
      socket.off();
    }

  }, [msgs]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>JenChat</h2>
            <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {msgs.map((item,i)=><Message user={item.id===id?'':item.user} msg={item.message} classs={item.id===id?'right':'left'} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event)=>event.key === "Enter" ? send() : null} type="text" name="" id="chatInput" />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default chat;
