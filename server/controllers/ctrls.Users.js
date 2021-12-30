const db = require('../../db/models').Users;

const getUserExists = async (req, res) => {
  try {
    const { user } = req.query;
    let results = await db.getUserByNameOrId(user)
    let userExists = !results.length ? false : true
    res.status(200).json(results);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const results = await db.createUser(req.body);
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

const createSession = async (req, res) => {
  try {
    res.status(201).json(res.user);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = {
  getUserExists,
  createUser,
  createSession
}