const { number } = require("joi");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongo db"))
  .catch((err) => console.log("connection error occur to mongo db, ", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
    minlength: 5,
    maxlength: 12,
    match: /patter/,
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
    lowercase: true,//turn category value to lowercase
    uppercase: true,
    trim: true
  },
  author: string,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (val, callback) {
        setTimeout(() => {
          //do some async work
          const result = v && val.length > 0;
          callback(result);
        }, 3000);
      },
      message: "array length less than 0, a coruse should have a tag",
    },
  },
  date: { type: date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 100,
    get: v=> Math.round(v), //value get from mongo db will be rounded
    set: v=> Math.round(v) //value set to mongo db will be rounded
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse(params) {
  const course = new Course({
    //name: "angular",
    category: "Web",
    author: "nova",
    //tags: ["good", "frontend"],
    //tags: null
    isPublished: true,
    price: 12.9,
  });

  try {
    //const isValid = await course.valiate();
    //if(!isValid){   }
    //request.body.name
    await course.validate((err) => {
      if (err) {
      }
    });
    const result = await course.save();
  } catch (ex) {
    //console.log(ex.message);
    //console.log(ex.errors.category)
    for (field in ex.errors) {
      console.log(ex.errors[field]);
    }
  }

  console.log(result);
}
