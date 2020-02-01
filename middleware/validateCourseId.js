//first we need a refenerece to all the courses
const courses = require('../data/courses.js');

//now we need to bvalidate the course id
//first we will accept the parameters for the request and response object and also
//the callback for the next function to run after validating
const validateCourseId = (req, res, nextStep) => {

    //get the course id from the request parameters and find the index
    //by matching the course id to the to the ones currently in our array
    const cID = parseInt(req.params.courseId);
    const index = courses.findIndex(course => course.id === cID);


    //if index is less than zero we know that there isnt any matches so we can 
    //send back a 404 error, if we do find a match we add the index to the courseIndex
    //property of the request object and pass it onto the properly routed function
    if( index < 0) {
        res.status(404).send({
            errors: [{
                status: 'Not Found',
                code: '404',
                title: "Resource does not exist",
                description: `We could not find a course with ${cID} at this time`
            }]
        });
    } else {
        req.courseId = cID; 
        req.courseIndex = index;
        nextStep();
    }
}

//make sure to make this module usuable by exporting the validate course id function
module.exports = validateCourseId; 