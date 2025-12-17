
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const Resume = require('../models/resumeModel');

const getDashboardStats = async (req, res) => {
    try {
        const totalResumes = await Resume.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalUsers = await User.countDocuments();

        // (Optional) growth logic
        const resumeGrowth = 12; // calculate if needed
        const jobGrowth = 8;
        const userGrowth = 15;

        res.status(200).json({
            success: true,
            data: {
                totalResumes,
                resumeGrowth,
                totalJobs,
                jobGrowth,
                totalUsers,
                userGrowth
            }
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load dashboard stats"
        });
    }
}

const getRecentActivity = async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ createdAt: -1 }).limit(3).select("userName createdAt");

        const jobs = await Job.find().sort({ createdAt: -1 }).limit(3).select("title company createdAt");

        const users = await User.find().sort({ createdAt: -1 }).limit(3).select("email createdAt");

        const activity = [
            ...resumes.map(r => ({
                type: "resume",
                title: "New resume analyzed",
                description: `${r.userName} uploaded a resume`,
                createdAt: r.createdAt
            })),
            ...jobs.map(j => ({
                type: "job",
                title: "New job added",
                description: `${j.title} at ${j.company}`,
                createdAt: j.createdAt
            })),
            ...users.map(u => ({
                type: "user",
                title: "New user registered",
                description: u.email,
                createdAt: u.createdAt
            }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        res.json({ success: true, data: activity });
    } catch (err) {
        res.status(500).json({ success: false });
    }
}

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
        const resumes = await Resume.find();
        res.status(200).json(resumes);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const filterResumes = async (req, res) => {
    const { search, ats, ai, date } = req.query;
    let query = {};
    if (search) {
        query.$or = [
        { userName: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
        ];
    }
    if (ats) {
        const [min, max] = ats.split("-").map(Number);
        query.atsScore = {
            $gte: min,
            $lte: max
        };
    }
    if (ai) {
        const [min, max] = ai.split("-").map(Number);
        query.aiScore = {
            $gte: min,
            $lte: max
        };
    }
    if (date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        query.createdAt = {
            $gte: start,
            $lte: end
        };
    }
    console.log(JSON.stringify(query, null, 2));
    try {
        const resumes = await Resume.find(query).sort({ createdAt: -1 });
        res.json({ success: true, resumes });
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

const filterJobs = async (req, res) => {
    try {
        const { search, status, company } = req.query;
        let query = {};

        // 🔍 Search by job title or company
        if (search && search.trim() !== "") {
            query.position = { $regex: search.trim(), $options: "i" };
        }

        // 📌 Status filter
        if (status) {
            query.status = status;
        }

        // 🏢 Company filter
        if (company) {
            query.company = new RegExp(company, "i");
        }

        console.log(JSON.stringify(query, null, 2));

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.json({ success: true, jobs });

    } catch (err) {
            res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        res.status(200).json({
            message: "Successfully!",
            job
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const addJob = async (req, res) => {
    try {
        const userId = req.user.user.id;
        console.log("here")
        const { company, position, description, status, link, notes, appliedDate } = req.body;
        const newJob = new Job({ userId, company, position, description, status, link, notes, appliedDate });
        await newJob.save();
        res.send({
            success: true,
            job: newJob
        });
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
        const { company, position, description, status, link, notes, appliedDate } = req.body;
        const updatedJob = await Job.findByIdAndUpdate(id, { company, position, description, status, link, notes, appliedDate }, {new: true});
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            message: "Successfully!",
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        console.log(name)
        const newUser = new User({ name, email, role });
        await newUser.save();
        res.send({
            success: true,
            job: newUser
        });
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
        const { name, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, role }, {new: true});
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

module.exports = { getDashboardStats, getRecentActivity, getUsersJobsAndResumes, getResumes, filterResumes, getJobs, filterJobs, getJobById, addJob, updateJob, deleteJob, getUsers, getUserById, addUser, updateUser, deleteUser, logout };
