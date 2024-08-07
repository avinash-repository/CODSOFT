const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Applicant = require('../models/Application');


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'your-email@gmail.com', 
    pass: 'your-email-password'   
  }
});

router.post('/apply', async (req, res) => {
  try {
    const { name, email, phoneNumber, motivation, resume, class10Percentage, class10Board, class12Percentage, class12Board, role, currentEducation, collegeName } = req.body;

    
    const newApplicant = new Applicant({
      name,
      email,
      phoneNumber,
      motivation,
      resume,
      role,
      class10Percentage,
      class10Board,
      class12Percentage,
      class12Board,
      currentEducation,
      collegeName
    });

    
    await newApplicant.save();

    
    const mailOptions = {
      from: 'abc@gmail.com' ,//please write your own gmail id and passowrd
      to: email,
      subject: 'Application Received - Thank You!',
      text: `Dear ${name},

Thank you for applying for the ${role} position at our company. We have successfully received your application and are excited to review your credentials.

Your application is currently under review. We will carefully assess your qualifications, experiences, and the motivation you have expressed to join our team. We are looking for candidates who are passionate, skilled, and align with our company's values and vision.

If your profile matches our requirements, we will reach out to you for an interview. Please ensure that your contact details are up-to-date and that you are available for communication during this period.

We appreciate your interest in our company and the time you have taken to apply. Our team is dedicated to providing a supportive and professional environment, and we believe that each applicant deserves careful consideration.

Should you have any questions or need further information, feel free to contact us at any time.

Thank you once again for your interest. We wish you the best of luck with your application.

Kind regards,

Jobhunt 
jobhunt.hr@gmail.com  
415147846
`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(201).json({ message: 'Application submitted successfully and confirmation email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting the application' });
  }
});

module.exports = router;
