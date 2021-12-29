const express = require('express');
const path = require('path');
const app = express();
const { Users, Messages, Rooms } = require('./routes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use('/users', Users)
app.use('/messages', Messages)
app.use('/rooms', Rooms)

module.exports = app;
