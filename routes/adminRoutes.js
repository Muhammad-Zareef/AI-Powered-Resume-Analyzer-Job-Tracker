
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const { getDashboardStats, getRecentActivity, getUsersJobsAndResumes, getResumes, filterResumes, getJobs, filterJobs, getJobById, addJob, updateJob, deleteJob, getUsers, getUserById, addUser, updateUser, deleteUser, logout } = require('../controllers/adminController');

router.get("/dashboard", verifyToken, verifyAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin Dashboard", admin: req.user.user
    });
});

router.use(verifyToken, verifyAdmin);
router.get("/dashboard-stats", getDashboardStats);
router.get("/recent-activity", getRecentActivity);
router.get('/getUsersAndBlogs', getUsersJobsAndResumes);
router.get('/getResumes', getResumes);
router.get('/resumes/filter', filterResumes);
router.get('/getJobs', getJobs);
router.get('/jobs/filter', filterJobs);
router.get('/getJob/:id', getJobById);
router.post('/jobs', addJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);
router.get('/users', getUsers);
router.get('/getUser/:id', getUserById);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/logout', logout);

module.exports = router;
