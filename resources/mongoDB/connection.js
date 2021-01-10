
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
   
    const result = await course.save();
    console.log(result);
}
//createCourse(course);

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

//update && delete documents
//query first
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;
    //1.
    course.set({
        isPublished: true,
        author: "another author"
    })
    //2.
    course.isPublished = true;
    course.author = "another author";

    const result = await course.save();
    console.log(result);
}


//update first
async function  udpateCourse2(id) {
    //_id is column name
    //$set is mongo update operator
    const course = await Course.update({_id: id},{
        $set: {
            author: "author",
            isPublished: false
        }
    })

    //second mongo method. -> findByIdAndUpdate
    const course = await Course.findByIdAndUpdate(id,{
        $set: {
            author: "test",
            isPublished: false
        }
    }, {new: true})
    //new true will show the update content in terminal, it returns the object from db
}

async function removeCouse(id) {
    const result = await Course.deleteOne({_id: id});
    //Course.deleteMany
    //Course.findByIdAndRemove
    Course.deleteOne({isPublished: true});
}

