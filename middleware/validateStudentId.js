//first we need a refenerece to all the students
const students = require('../data/students.js');

//now we need to validate the student id
//first we will accept the parameters for the request and response object and also
//the callback for the next function to run after validating
const validateStudentId = (req, res, nextStep) => {

    //get the student id from the request parameters and find the index
    //by matching the student id to the to the ones currently in our array
    const sID = parseInt(req.params.studentId);
    const index = students.findIndex(student => student.id === sID);


    //if index is less than zero we know that there isnt any matches so we can 
    //send back a 404 error, if we do find a match we add the index to the studentIndex
    //property of the request object and pass it onto the properly routed function
    if( index < 0) {
        res.status(404).send({
            errors: [{
                status: 'Not Found',
                code: '404',
                title: "Resource does not exist",
                description: `We could not find a student with ${sID} at this time`
            }]
        });
    } else {
        req.studentId = sID; 
        req.studentIndex = index;
        nextStep();
    }
}

//make sure to make this module usuable by exporting the validate student id function
module.exports = validateStudentId; 