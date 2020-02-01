'use strict';

//first get the referneces to the express libary 
const courseRouter = require('./routes/courses.js');
const express = require('express');
const app = express();


app.use(express.json());
app.use('/api/courses', courseRouter);

const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server Listening on Port ${port}...`));