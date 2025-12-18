
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const { auth, getDashboardStats, getRecentActivity, getResumes, getResumeById, filterResumes, getJobs, filterJobs, getJobById, addJob, updateJob, deleteJob, getUsers, getUserById, addUser, updateUser, deleteUser, logout } = require('../controllers/adminController');

// router.use(verifyToken, verifyAdmin);
router.get("/dashboard", verifyToken, verifyAdmin, auth);
router.get("/dashboard-stats", getDashboardStats);
router.get("/recent-activity", getRecentActivity);
router.get('/resumes', getResumes);
router.get('/resumes/:id', getResumeById);
router.get('/resumes/filter', filterResumes);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/jobs/filter', filterJobs);
router.post('/jobs', addJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/logout', logout);

module.exports = router;
