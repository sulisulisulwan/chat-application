import React from 'react';

const Message = ({ messageData }) => {
  const { id, message, timestamp, username, roomId } = messageData;

  return (
    <>
      <div className="message"><span>{username}:&nbsp;</span>{message}</div>  
    </>
  )
}

export default Message;