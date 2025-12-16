
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const { getUsersJobsAndResumes, getResumes, filteredResumes, getJobs, updateJob, deleteJob, getUsers, updateUser, deleteUser, logout } = require('../controllers/adminController');

router.get("/dashboard", verifyToken, verifyAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin Dashboard", admin: req.user.user
    });
});

router.use(verifyToken, verifyAdmin);
router.get('/getUsersAndBlogs', getUsersJobsAndResumes);
router.get('/getResumes', getResumes);
router.get('/resumes', filteredResumes);
router.get('/getBlogs', getJobs);
router.put('/updateBlog/:id', updateJob);
router.delete('/deleteBlog/:id', deleteJob);
router.get('/getUsers', getUsers);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.post('/logout', logout);

module.exports = router;
