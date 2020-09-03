import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import "../SidebarChat.css";
import db from '../firebase';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


function SidebarChat({ id, name, addNewChat }) {
    
    const [messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp" , "desc").onSnapshot(snapshot =>{
                setMessages(snapshot.docs.map(doc => doc.data()));
            });
        }
    }, [id]);


    const creatNewChat = (e) =>{
        e.preventDefault();
        const roomName = prompt("Please enter name for  chat room s");

        if (roomName){
            db.collection("rooms").add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className = "sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 5000)}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (<div className = "sidebarChat" onClick = {creatNewChat}>
                <h2>Add New Chat</h2>
        </div>)
        
}

export default SidebarChat;
