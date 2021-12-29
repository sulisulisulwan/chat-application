import React from 'react';

const Message = ({ self, messageData }) => {
  const { id, message, timestamp, username, roomId } = messageData;
  return (
    <>
      <div className="message"><span className={`message-username${username === self.username ? ' self' : ' other'}`}>{username}:&nbsp;</span>{message}</div>  
    </>
  )
}

export default Message;