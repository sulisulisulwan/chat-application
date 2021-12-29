const router = require('express').Router()
const Ctrl = require('../controllers').Rooms; 

router.get('/', Ctrl.getAllRooms)
router.post('/', Ctrl.createRoom)

module.exports = router