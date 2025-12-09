
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { getUsers, login, signup, logout } = require('../controllers/userController');

router.get('/users', getUsers);
router.post('/login', login);
router.post('/signup', signup);
// router.post('/verifyToken', verifyToken, checkUserRole);
router.post('/logout', logout);

module.exports = router;
