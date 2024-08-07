const express = require('express');
const Student = require('../models/student');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        const { fullName, email, password, phoneNumber, address, postalcode } = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            postalcode
        });

        await student.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const data = { id: student._id, email: student.email };
        const authToken = jwt.sign(data, jwtSecret);

        res.status(200).json({ message: 'Login successful', authToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
            fullName: student.fullName,
            email: student.email,
            phoneNumber: student.phoneNumber,
            address: student.address,
            postalcode: student.postalcode
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
