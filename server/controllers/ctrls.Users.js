const db = require('../../db/models').Users;

const getUser = async (req, res) => {
  try {
    const { user } = req.query;
    let results = await db.getUserByNameOrId(user)
    if (!results.length) {
      results = 'username doesn\'t exist';
    }
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

module.exports = {
  getUser,
  createUser
}