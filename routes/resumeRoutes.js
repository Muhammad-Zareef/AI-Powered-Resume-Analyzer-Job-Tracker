
const express = require('express');
const router = express.Router();
const { getResumes, analyzeResume, deleteResume, login, signup, auth, logout } = require('../controllers/resumeController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/auth', verifyToken, auth);
router.get('/', verifyToken, getResumes);
router.post('/analyze', verifyToken, analyzeResume);
router.delete('/deleteResume/:id', verifyToken, deleteResume);
// router.post('/signup', signup);
// // router.post('/home', authrization, home);
// // router.post('/verifyToken', verifyToken, checkUserRole);
// router.post('/logout', logout);

module.exports = router;
