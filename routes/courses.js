const express = require("express");
const router = express.Router();

//global data
const courses = [
    {id: 1, name: "Artist"},
    {id: 2, name: "Chemistry"},
    {id: 3, name: "Math"}
]

console.log("hi leah")
router.get('/', (req, res)=>{
    res.send(courses)
})

router.get('/:id', (req, res)=>{
    const targetCourse = courses.find( c => parseInt(req.params.id) === c.id);
    if(!targetCourse){
       return res.status("404").send("The course ID is not available.")
    }
    res.send(targetCourse)
    
})


router.post('/', (req, res)=>{

    const {error} = validateCourse(req.body)
    if(error){
        return res.status("400").send(error.details[0].message)
    }
    const courseObj = {
        id: courses.length + 1,
        name: req.body.name
    }
    if(courses.find(c => parseInt(courseObj.id === c.id))){
        return res.status("404").send("The course already exist.")
    }
    courses.push(courseObj);
    res.send(courseObj)
    
})

router.put('/:id', (req, res)=>{
    const targetCourse = courses.find( c => parseInt(req.params.id) === c.id);
    if(!targetCourse){
       return res.status("404").send("The course ID is not available.")
    }

    const {error} = validateCourse(req.body)

    if(error){
        return res.status("400").send(error.details[0].message)
    }

    targetCourse.name = req.body.name;
    return res.send(targetCourse);
})

router.delete('/:id', (req, res)=>{
    const targetCourse = courses.find( c => parseInt(req.params.id) === c.id);
    if(!targetCourse){
       return res.status("404").send("The course ID is not available.")
    }
    const index = courses.indexOf(targetCourse);
    courses.splice(index, 1);
    res.send(targetCourse)

})
function validateCourse(course){

    const nameSchema = {
        name: joi.string().min(3).required()
    }
    return joi.validate(course, nameSchema);
}

module.exports = router;
