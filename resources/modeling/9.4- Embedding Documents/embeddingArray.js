const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
    //author: {
    //   type: authorSchema,
    //   required: true
    // }
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

createCourse(
  "Node Course",
  new Author({ name: "mili" }),
  new Author({ name: "klei" }),
  new Author({ name: "Mod" })
);

async function updateAuthor(courseId) {
  //query first
  // const course = Course.findById(courseId);
  // course.author.name = "bila";
  // await course.save();
  //update

  const course = Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "milaila",
      },
    }
  );

  //remove author from course property
  const course2 = Course.update(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}


async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author)
  course.save();
}

//addAuthor("2839828392u382", new Author({name: "mile"}))


async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId)
  author.remove();
  course.save();
}

//removeAuthor("2839828392u382", "2839828392u382sdfa9848")