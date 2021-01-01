//DB connect
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playground")
.then(()=>console.log("connected to mongo db"))
.catch((err)=>console.log("connection error occur to mongo db, ",err));
//create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema);
const course = new Course({
    name: "angular",
    author: "nova",
    tags: ["good","frontend"],
    isPublished: true
})


// eq (equal)
// ne (not equal)
// gt (greater than)
// gt (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)

async function createCourse(params) {
    const result = course.save();
    console.log(result);
}
//createCourse();

async function getCourses(params) {
    //logical operator
    //const courses = await Course.find({price: {$gt: 10, $lte: 20}})
    //.find({price: {$in: [10, 20, 30]} })
    //.find({author: "kelly"})

    //.find()
    //.or
    const courses = await Course.find()
        .or([{author: "kelly"}, {name: "math"}])
        .and([])
        .limit(10)
        .sort({name: 1})
        .select({name: 1});
    console.log(courses);
}
getCourses();

async function getCourseWithRegex(){
    //^ represent string starts with
    const courses = await Course.find()
        .find({author: /^kelly/})
    //string ends with
    const courses2 = await Course.find()
        .find({author: /kelly$/i})

    //contain string
    //count
    const courses2 = await Course.find()
        .find({author: /.*kelly.*/i})
        .count();
    console.log("count contains kelly: ", courses2)

    //pagination - skip all in the previous pages
    //pageNum start from 1, not page index
    // api/courses?pageNum=2&pageSize=10
    const pageNum = 2;
    const pageSize = 10;
    const courses2 = await Course.find()
        .find({author: /.*kelly.*/i})
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
}


