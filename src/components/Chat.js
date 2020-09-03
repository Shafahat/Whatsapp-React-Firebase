import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import moment from "moment";
import "../Chat.css";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    
    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ));
        }        
    }, [roomId]);


    const sendMessage = (e) =>{
        e.preventDefault();
        console.log("You wrote this: =>", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }
    return (
        <div className ="chat"> 
            <div className="chat_header">
                <IconButton>
                    <Avatar src={`https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 5000)}.svg`}/>
                </IconButton>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {
                            moment(Date(messages[messages.length - 1]?.timestamp?.toDate())).format('LT')
                        }

                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton> 
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton> 
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton> 
                </div>
            </div>
            <div className="chat_body">
                { messages.map((message) => (
                    <div  className={`chat_message ${message.name === user.displayName &&"chat_receiver"}`}>
                        <div className = {`message_body ${message.name === user.displayName &&"chat_receiverBody"}`}>
                        <div className="message_header">
                            <span><a href="fb.com" >{message.name}</a></span>
                        </div>
                        <div className="message_context" >
                            <span className="message_data">
                                {message.message}
                            </span>
                        </div>
                        <div className="message_timestamp">
                            <span >{moment(Date(message.timestamp?.toDate())).format('LT')}</span>
                        </div>
                    </div>
                   </div>
                ))}                              
            </div>
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <div className="chat_input">
                    <form className="input_form">
                        <input type="text" placeholder ="Type a message" 
                        id="message_input" 
                        value={input}
                        onChange ={(e) => setInput(e.target.value)}/>
                        <button type="submit" onClick={sendMessage}>Send a message</button>
                    </form>   
                </div>
                <IconButton>
                    <MicIcon/>
                </IconButton>       
            </div>                     
        </div>
    )
}

export default Chat;
