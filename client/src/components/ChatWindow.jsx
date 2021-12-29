import React from 'react';
import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom.jsx'
import RoomSelect from './RoomSelect.jsx'

const ChatWindow = ({ username, rooms, room, setRoom, getAllRooms, roomCatalogue }) => {
  
  const [ messages, setMessages ] = useState([]);
  const [ inputText, setInputText ] = useState('');
  const [ addRoomInputText, setAddRoomInputText ] = useState('')
  const [ intervalId, setIntervalId ] = useState(null);
  const [ fetchingMessages, setFetchingMessages ] = useState(false);
  const handleAddRoomChange = (e) => {
    setAddRoomInputText(e.target.value);
  }
  const handleSelectRoomChange = (e) => {
    let name = roomCatalogue[e.target.value]
    let id = e.target.value
    setRoom({
      id, name
    });
  }

  const getMessagesByRoomId = (roomId) => {
    fetch(`/messages?roomId=${roomId}`)
      .then(results => results.json())
      .then(results => setMessages(results))
      .catch(err => console.error(err));
  }

  const addRoom = () => {
    fetch('/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addRoomInputText
      })
    })
    .then(result => result.json())
    .then(roomId => {
      setRoom({ name: addRoomInputText, id: roomId})
      getAllRooms();
    })
  }

  
  useEffect(() => {
    if (room === null) { return; }
    
    clearInterval(intervalId);
    let newIntervalId = setInterval(() => getMessagesByRoomId(room.id), 200)
    setIntervalId(newIntervalId);
  }, [room])

  return (
    <>
      <RoomSelect 
        rooms={rooms} 
        addRoom={addRoom}
        handleAddRoomChange={handleAddRoomChange}
        addRoomInputText={addRoomInputText}
        handleSelectRoomChange={handleSelectRoomChange}
      />
      <ChatRoom 
        username={username} 
        setInputText={setInputText} 
        inputText={inputText} 
        room={room} 
        getMessagesByRoomId={getMessagesByRoomId} 
        setMessages={setMessages} 
        messages={messages}
      />
    </>
  )
}

export default ChatWindow;