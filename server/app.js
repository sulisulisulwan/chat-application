const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

const { Users, Rooms, Messages } = require('../db/models')


app.get('/users', async (req, res) => {
  try {
    const { user } = req.query;
    const results = await Users.getUserByNameOrId(user)
    res.status(200).json(results);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.post('/users', async (req, res) => {
  try {
    const results = await Users.createUser(req.body);
    if (typeof results === 'object') {
      res.status(401).json(results)
      return;
    }
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.get('/rooms', async (req, res) => {
  try {
    const results = await Rooms.getAllRooms();
    res.status(200).json(results);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})


app.post('/rooms', async (req, res) => {
  try {
    const results = await Rooms.createRoom(req.body);
    if (typeof results === 'object') {
      res.status(401).json(results)
      return;
    }
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.get('/messages', async(req, res) => {
  try {
    const { roomId } = req.query;
    const results = await Messages.getMessagesByRoomId(roomId)
    res.status(200).json(results);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.post('/messages', async(req, res) => {
  try {
    const message = req.body;
    const results = await Messages.postMessage(message);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

module.exports = app;
