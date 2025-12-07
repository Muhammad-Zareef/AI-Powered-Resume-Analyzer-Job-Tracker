
const { Schema, model } = require('mongoose');

const JobSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    jobDescription: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Applied", "Interviewing", "Rejected", "Offered"],
        default: "Applied",
    },
    notes: {
        type: String,
        default: "",
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const JobModel = model("Job", JobSchema);

module.exports = JobModel;
