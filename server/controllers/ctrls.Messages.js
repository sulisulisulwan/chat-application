const db = require('../../db/models').Messages;

const getMessages = async(req, res) => {
  try {
    const { roomId } = req.query;
    const results = await db.getMessagesByRoomId(roomId)
    res.status(200).json(results);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
}

const postMessage = async(req, res) => {
  try {
    const message = req.body;
    const results = await db.postMessage(message);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = {
  getMessages,
  postMessage
}