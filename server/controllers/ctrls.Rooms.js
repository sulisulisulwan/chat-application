const db = require('../../db/models').Rooms;

const getAllRooms = async (req, res) => {
  try {
    const results = await db.getAllRooms();
    res.status(200).json(results);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createRoom = async (req, res) => {
  try {
    const results = await db.createRoom(req.body);
    if (typeof results === 'object') {
      res.status(401).json(results)
      return;
    }
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllRooms,
  createRoom
}