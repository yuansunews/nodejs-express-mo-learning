const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
  //author: {
  //   type: authorSchema,
  //   required: true
  // }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

createCourse('Node Course', new Author({ name: 'Mosh' }));


async function  updateAuthor(courseId) {
  //query first
  // const course = Course.findById(courseId);
  // course.author.name = "bila";
  // await course.save();
  //update

  const course = Course.update({_id: courseId},{
    $set: {
      "author.name": "milaila"
    }
  })

  //remove author from course property
  const course2 = Course.update({_id: courseId},{
    $unset: {
      "author": ""
    }
  })
}