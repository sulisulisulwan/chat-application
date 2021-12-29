import React from 'react';
import Message from './Message.jsx';

const MessageFeed = ({ username, messages }) => {
  return (
    <div className="chats-wrapper">
      <div className="chats">
        {messages.length ? 
          messages.map((message, i) => <Message key={`message-${username}-${message.id}-${i}`} self={username} messageData={message}/>)
          : null
        }
      </div>
    </div>
  )
}

export default MessageFeed;