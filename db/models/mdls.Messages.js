const db = require('../db')

const getMessagesByRoomId = async (roomId) => {
  const q = `SELECT * FROM Messages WHERE roomId = ${roomId}`;
  const result = await db.query(q);
  return result[0];
}

const postMessage = async(message) => {
  let timestamp = new Date().toISOString();
  timestamp = `${timestamp.substring(0,10)} ${timestamp.substring(11, 19)}`;
  message.timestamp = timestamp;
  const q = `INSERT INTO Messages SET ?`;
  const v = message;
  const result = await db.query(q, v);
  return result[0];
}

module.exports = {
  getMessagesByRoomId,
  postMessage
};