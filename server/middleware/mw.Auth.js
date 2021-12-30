const bcrypt = require('bcrypt');
const crypto = require('crypto');


const authorizeUser = async(req, res, next) => {
  //hash password
  //get hashed password from user
  //compare hashes
  //if comparison is false
    //respond with res.user{ data: null, authorized: false }
  //add cookies hash to res.cookies
  //call next() goes to createSession
}

const compareCookies = async (req, res, next) => {
  let { cookies } = req;
  //get prevCookies from db
  if (cookies === null || cookies !== prevCookies) {
    //create a new cookie in db and reassign cookies to new cookie
  }
  res.cookies = cookies;
  next()
}


module.exports = {
  authorizeUser,
  compareCookies
}