
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    stipend: {
        type: Number,
        required: true
    },
    numberOfOpenings: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    }
});

const employerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    companyAddress: {
        type: String,
        required: true,
        trim: true
    },
    postalcode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    websiteLink: {
        type: String,
        required: true,
        trim: true
    },
    jobPosts: [jobPostSchema]
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
