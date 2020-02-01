//first import all the modules needed for this to run,
//express and the middleware function to validate the student id
//also get references to the base data for the server

const students = require('../data/students.js');
const express = require('express');
const validateStudentId = require('../middleware/validateStudentId.js');
const router = express.Router();


//tell the router that whenever we get a request with the student id parameter
//we will send that id off to a middleware function in order to validate the student id
//before we use in server route functions
router.use('/:studentId', validateStudentId);

//first the get request for all students
//if the router sees this request it will respond by sending back
//all the data from the students object at that time
router.get('/', (req, res) => res.send({data: students}));

//when the router gets a get reuqest for a spefic id in the students api
//the id parameter (already being validated above) will be parsed from the request
//parameters and then we will find the specfic student that matches
router.get('/:studentId', (req, res) => {
    res.send({data: students[req.studentIndex]});
});

//this is the post route, the user will send a student object and
//that will be placed into the students array after creating an object
//with all the proper properties (then send a status code 201)
//also sending back the students that we added 
router.post('/', (req, res) => {
    const {id, firstName, lastName, nickName, email} = req.body;
    const newStudent = {
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "nickName": nickName,
        "email": email
    };
    students.push(newStudent);
    res.status(201).send({"data": newStudent});
});

//this is the server route for the put request
//the user will submit a request object with the body
//containing a full student object to put into a specifc id (update)
//the req will have the studentIndex and studentId fromthe validate coruse id middleware fucntion
router.put('/:studentId', (req, res) =>{
    const {firstName, lastName, nickName, email} = req.body;
    const updatedStudent = {
        "id": parseInt(req.studentId), 
        "firstName": firstName,
        "lastName": lastName,
        "nickName": nickName,
        "email": email
    };
    students[req.studentIndex] = updatedStudent; 
    res.send({"data": updatedStudent});
});

//this is the patch route for our server, the user will send a erquest
//contaiing specfic proerpties they want updted (or patched) onto existing students
//we will use object.assign to combine the existing object with the updated properties
//from the reqest and we will use the ...rest operator to capture all proerpties they submitted
router.patch('/:studentId', (req, res) =>{
    const {id, ...remainingProperties} = req.body;
    const updatedStudent = Object.assign({}, students[req.studentIndex], remainingProperties);
    students[req.studentIndex] = updatedStudent;
    res.send({"data": updatedStudent});
});

//this is the delete route for the server, the user will submit a request object
//with the id of the student they want deleted from the server, after the id is processed
//using the validate middleware function we will get a reference to the deleted item
//and then splice the student from the array afterwards sending a response containing the deleted item
router.delete('/:studentId',(req, res) =>{
    const deletedItem = students[req.studentIndex];
    students.splice(req.studentIndex, 1);
    res.send({"data": deletedItem});
})

//now we have to make sure to export the router created aboce so the app.js server can
//use this as a server router to handle all the /api/students routes
module.exports = router;