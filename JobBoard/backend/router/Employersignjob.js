const express = require('express');
const Employer = require('../models/employer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "Youcannothackthisdatabase";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
};

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, companyAddress, websiteLink, postalcode } = req.body;

        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employer = new Employer({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            companyAddress,
            websiteLink,
            postalcode,
            jobPosts: []
        });

        await employer.save();

        res.status(201).json({ message: 'Employer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, employer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const data = { id: employer._id, email: employer.email }; 
        const authToken = jwt.sign(data, jwtSecret);

        res.status(200).json({ message: 'Login successful', authToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/jobpost', authenticateToken, async (req, res) => {
    try {
        const jobPost = req.body;
        const employerId = req.user.id;

        const employer = await Employer.findById(employerId);
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }

        employer.jobPosts.push(jobPost);
        await employer.save();

        res.status(201).json({ message: 'Job post added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const employer = await Employer.findById(req.user.id);
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }

        res.status(200).json({
            fullName: employer.fullName,
            email: employer.email,
            phoneNumber: employer.phoneNumber,
            companyAddress: employer.companyAddress,
            websiteLink: employer.websiteLink,
            postalcode: employer.postalcode,
            jobPosts: employer.jobPosts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
