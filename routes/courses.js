//first import all the modules needed for this to run,
//express and the middleware function to validate the course id
//also get references to the base data for the server

const courses = require('../data/courses.js');
const express = require('express');
const validateCourseId = require('../middleware/validateCourseId');
const router = express.Router();


//tell the router that whenever we get a request with the course id parameter
//we will send that id off to a middleware function in order to validate the course id
//before we use in server route functions
router.use('/:courseId', validateCourseId);

//first the get request for all courses
//if the router sees this request it will respond by sending back
//all the data from the courses object at that time
router.get('/', (req, res) => res.send({data: courses}));

//when the router gets a get reuqest for a spefic id in the courses api
//the id parameter (already being validated above) will be parsed from the request
//parameters and then we will find the specfic course that matches
//***** try to just use the index from the validatecourse id and just send that
//specfic object from the array */
router.get('/:courseId', (req, res) => {
    // const courseId = parseInt(req.params.courseId);
    // const course = courses.find(course => course.id === courseId);
    // res.send({data: course});
    res.send({data: courses[req.courseIndex]});
});

module.exports = router;