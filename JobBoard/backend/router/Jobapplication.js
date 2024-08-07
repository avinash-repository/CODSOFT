const express = require('express');
const Employer = require('../models/employer'); // Ensure this path is correct
const router = express.Router();

router.get('/all-job-posts', async (req, res) => {
    try {
        const employers = await Employer.find({}, 'jobPosts fullName email');

        const allJobPosts = employers.reduce((acc, employer) => {
            const employerInfo = {
                fullName: employer.fullName,
                email: employer.email,
            };
            const jobPosts = employer.jobPosts.map(jobPost => ({
                ...jobPost.toObject(), 
                employerInfo,
            }));
            return acc.concat(jobPosts);
        }, []);

        res.status(200).json(allJobPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
