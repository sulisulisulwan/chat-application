//this will eventually migrate to mongoose mongo
const mysql = require('mysql2')
require('dotenv').config({ path: '../server/.env' })
const { DB_USERNAME, DB_PW, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PW,
  database: DB_DATABASE,
  port: DB_PORT
})

module.exports = connection.promise();