
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const Resume = require('../models/resumeModel');

const getUsersJobsAndResumes = async (req, res) => {
    try {
        const users = await User.find();
        const jobs = await Job.find();
        const resumes = await Resume.find();
        res.status(200).json({
            users,
            jobs,
            resumes,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getResumes = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, author, desc} = req.body;
        const updatedJob = await Job.findByIdAndUpdate(id, {title, author, desc}, {new: true});
        res.status(200).json({
            message: "Job updated successfully!",
            updatedJob
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(id);
        res.status(200).json({
            message: "Job deleted successfully",
            deletedJob
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {fullName, email, role} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {fullName, email, role}, {new: true});
        res.status(200).json({
            message: "User updated successfully!",
            updatedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
    res.json({ message: "Logged out successfully" });
};

module.exports = { getUsersJobsAndResumes, getResumes, getJobs, updateJob, deleteJob, getUsers, updateUser, deleteUser, logout };
