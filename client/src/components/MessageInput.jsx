import React from 'react';

const MessageInput = ({ username, setInputText, setMessages, inputText, getMessagesByRoomId, room }) => {

  const handleShadowTextInputChange = (e) => {
    setInputText(e.target.value);
  }

  const handleEnterKeyPress = (e) => {
    if (e.code === 'Enter') {
      handleSubmitMessages()
    }
  }

  const handleSubmitMessages = () => {
    console.log('username', username)
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.username,
        message: inputText,
        roomId: room.id
      })
    })
      .then(_ => {
        return getMessagesByRoomId(room.id)
      })
      .then(results => results.json())
      .then(results => {
        setInputText('')
        setMessages(results);
      })
    

  }

  return (
    <>
      <div className="message-input-wrapper">
        <input 
          id="shadow-text-input" 
          onKeyPress={handleEnterKeyPress} 
          onChange={handleShadowTextInputChange} 
          value={inputText}>
        </input>
        <div className="message-submit-wrapper">
          <button className="message-submit-button" onClick={handleSubmitMessages}>Enter</button>
        </div>
      </div>
    </>
  )
}

export default MessageInput;