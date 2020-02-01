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

//this is the post route, the user will send a course object and
//that will be placed into the courses array after creating an object
//with all the proper properties (then send a status code 201)
//also sending back the course that we added 
router.post('/', (req, res) => {
    const {id, code, title, description, url} = req.body;
    const newCourse = {
        "id": id,
        "code": code,
        "title": title,
        "description": description,
        "url": url
    };
    courses.push(newCourse);
    res.status(201).send({"data": newCourse});
});

//this is the server route for the put request
//the user will submit a request object with the body
//containing a full course object to put into a specifc id (update)
//the req will have the courseIndex and courseId fromthe validate coruse id middleware fucntion
router.put('/:courseId', (req, res) =>{
    const {code, title, description, url} = req.body;
    const updatedCourse = {
        "id": parseInt(req.courseId), 
        "code": code, 
        "title": title, 
        "description": description, 
        "url": url
    };
    courses[req.courseIndex] = updatedCourse; 
    res.send({"data": updatedCourse});
});

//this is the patch route for our server, the user will send a erquest
//contaiing specfic proerpties they want updted (or patched) onto existing courses
//we will use object.assign to combine the existing object with the updated properties
//from the reqest and we will use the ...rest operator to capture all proerpties they submitted
router.patch('/:courseId', (req, res) =>{
    const {id, ...remainingProperties} = req.body;
    const updatedCourse = Object.assign({}, courses[req.courseIndex], remainingProperties);
    courses[req.courseIndex] = updatedCourse;
    res.send({"data": updatedCourse});
});

//this is the delete route for the server, the user will submit a request object
//with the id of the course they want deleted from the server, after the id is processed
//using the validate middleware function we will get a reference to the deleted item
//and then splice the course from the array afterwards sending a response containing the delted item
router.delete('/:courseId',(req, res) =>{
    const deletedItem = courses[req.courseIndex];
    courses.splice(req.courseIndex, 1);
    res.send({"data": deletedItem});
})

//now we have to make sure to export the router created aboce so the app.js server can
//use this as a server router to handle all the /api/courses routes
module.exports = router;