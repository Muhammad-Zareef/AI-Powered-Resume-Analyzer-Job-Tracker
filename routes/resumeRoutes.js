
const express = require('express');
const router = express.Router();
const { analyzeResume, login, signup, auth, logout } = require('../controllers/resumeController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/auth', verifyToken, auth);
router.post('/analyze', analyzeResume);
// router.post('/signup', signup);
// // router.post('/home', authrization, home);
// // router.post('/verifyToken', verifyToken, checkUserRole);
// router.post('/logout', logout);

module.exports = router;
