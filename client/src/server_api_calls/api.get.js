import utils from './api.utils.js';

const userExists = (usernameInput) => {
  return fetch(`/users?user=${usernameInput}`).then(utils.getJson)
}


const allRooms = () => {
  return fetch('/rooms').then(utils.getJson)
}

export default {
  userExists,
  allRooms
}

