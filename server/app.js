const express = require('express');
const path = require('path');
console.log(path.resolve(__dirname, './client/dist'));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
module.exports = app;
