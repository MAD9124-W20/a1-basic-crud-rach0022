//to execute my code in strict mode, ECMAscript version 5 feature to use modern
'use strict'; 

//first get the referneces to the express libary
//and create the server application using said libarary
//also get the refeerence to my student and course route modules that will handle
//those spefic request
const courseRouter = require('./routes/courses.js');
const studentRouter = require('./routes/students.js');
const express = require('express');
const app = express();

//tell the app the process the request as json
// and for the route of /api/courses I want that to be routed to the courseRouter module
//and for the route of /api/students I want that to be handled by studentRouter
app.use(express.json());
app.use('/api/courses', courseRouter);
app.use('/api/students', studentRouter);

//define the port number (either from the system variables or 3030) and launch the server
//app on that port with a message saying the server is listening
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server Listening on Port ${port}...`));