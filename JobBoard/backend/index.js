const express = require('express');
const app = express();
const port = 3000;
const mongoDB = require("./db");
const cors = require("cors");
const studentRouter = require('./router/studentsignup');
const employerRouter = require('./router/Employersignjob');
const description = require('./router/Detaildesc');
const alljobppost = require('./router/Jobapplication');
const application =  require('./router/applicant');
mongoDB(); 

const bodyParser = require('body-parser');
const Applicant = require('./models/Application');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use('/api/students', studentRouter);
app.use('/api/employers', employerRouter);
app.use('/api', description);
app.use('/api' , application);
app.use('/api', alljobppost);

app.get('/', (req, res) => {
    res.send("Server started successfully");
});

app.listen(port, () => {
    console.log(`App is running at - http://localhost:${port}`);
});
