import React from 'react';

const RoomSelect = ({ rooms, addRoom, handleAddRoomChange, handleSelectRoomChange, addRoomInputText }) => {



  return (
    <div>
      <select onChange={handleSelectRoomChange}>
        {rooms.map((room, i)=> <option key={`${room.name}-${room.id}-${i}`} value={room.id}>{room.name}</option>)}
      </select>
      <input onChange={handleAddRoomChange} value={addRoomInputText}></input>
      <button onClick={addRoom}>Create Room</button>
    </div>
  )
}

export default RoomSelect;