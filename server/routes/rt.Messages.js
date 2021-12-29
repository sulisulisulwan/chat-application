const router = require('express').Router()
const Ctrl = require('../controllers').Messages;

router.get('/', Ctrl.getMessages)
router.post('/', Ctrl.postMessage)

module.exports = router