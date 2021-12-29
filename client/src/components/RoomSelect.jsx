import React from 'react';

const RoomSelect = ({ rooms, addRoom, handleAddRoomChange, handleSelectRoomChange, addRoomInputText }) => {



  return (
    <div className="room-select-wrapper">
      <div className="create-room-wrapper">
        <input onChange={handleAddRoomChange} value={addRoomInputText}></input>
        <button className="create-room-button" onClick={addRoom}>Create Room</button>
      </div>
      <select className="select-room-dropdown" onChange={handleSelectRoomChange}>
        {rooms.map((room, i)=> <option key={`${room.name}-${room.id}-${i}`} value={room.id}>{room.name}</option>)}
      </select>
    </div>
  )
}

export default RoomSelect;