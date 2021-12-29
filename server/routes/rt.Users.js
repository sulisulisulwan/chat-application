const router = require('express').Router()
const Ctrl = require('../controllers').Users; 

router.get('/', Ctrl.getUser)
router.post('/', Ctrl.createUser)


module.exports = router