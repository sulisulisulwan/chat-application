const router = require('express').Router()
const Ctrl = require('../controllers').Users; 
const Mw = require('../middleware').Auth;

router.get('/', Ctrl.getUserExists)
router.post('/', Ctrl.createUser)
router.post('/session', Mw.authorizeUser, Mw.compareCookies, Ctrl.createSession)


module.exports = router