const express = require('express');
const Employer = require('../models/employer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "Youcannothackthisdatabase";


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, forbidden
        req.user = user;
        next();
    });
};



router.get('/jobpost/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employer = await Employer.findOne({ "jobPosts._id": id }, { "jobPosts.$": 1 });
      if (!employer) {
        return res.status(404).json({ message: 'Job post not found' });
      }
      const jobPost = employer.jobPosts[0];
      res.status(200).json(jobPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;
