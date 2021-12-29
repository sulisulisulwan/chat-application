const db = require('../db')

const getAllRooms = async () => {
  const q = 'SELECT * FROM Rooms';
  const result = await db.query(q);
  return result[0];
}

const createRoom = async(room) => {
  console.log(room)
  const q = `INSERT INTO Rooms SET ?`
  const v = room;
  const result = await db.query(q, v);
  return result[0].insertId;
}

module.exports = {
  getAllRooms,
  createRoom
}
