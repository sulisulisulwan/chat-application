import React from 'react';
import { useEffect } from 'react';
import MessageFeed from './MessageFeed.jsx';
import MessageInput from './MessageInput.jsx';


const ChatRoom = ({ messages, username, inputText, setInputText, setMessages, room, getMessagesByRoomId }) => {

  return (
    <>
      <div className="chat-room-wrapper">
        <MessageFeed 
          username={username} 
          setInputText={setInputText} 
          inputText={inputText} 
          room={room} 
          getMessagesByRoomId={getMessagesByRoomId} 
          setMessages={setMessages} 
          messages={messages}
          />
        <MessageInput 
          username={username}
          setInputText={setInputText} 
          setMessages={setMessages} 
          inputText={inputText}
          getMessagesByRoomId={getMessagesByRoomId}
          room={room}
        />
      </div>

    </>
  )
}

export default ChatRoom;