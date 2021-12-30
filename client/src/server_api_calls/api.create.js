import utils from './api.utils.js';

const newUser = (username, password) => {
  return fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
    .then(utils.getJson)
    .catch(err => console.error(err))
}

const orRestoreSession = (usenrame , password) => {
  return fetch ('/users/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(( username, password))
  })
    .then(utils.getJson)
    .catch(err => console.error(err))
}


export default {
  newUser,
  orRestoreSession
}





