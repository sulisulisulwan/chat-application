const db = require('../db');


const createUser = async (username) => {
  try {
    const q = 'INSERT INTO Users SET ?';
    const v = username;
    const result = await db.query(q, v)
    return result[0].insertId;
  } catch(err) {
    console.error(err.sqlMessage);
    return err;
  }
}

const getUserByNameOrId = async(user) => {
  try {
    const column = isNaN(Number(user)) ? 'username' : 'id';
    const q = `SELECT * FROM Users WHERE ${column}='${user}'`;
    const result = await db.query(q);
    return result[0];
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  createUser,
  getUserByNameOrId
}