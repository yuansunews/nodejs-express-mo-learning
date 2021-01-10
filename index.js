const express = require("express");
const app = express();
const joi = require("joi");
joi.objectId = require('joi-objectid')(joi);
const helmet = require("helmet");
const morgan = require("morgan");
const config= require("config");
const startUpDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const coursesRouter = require("./routes/courses");
const homeRouter = require("./routes/home");
const logger = require("./middleware/logger");

//render view
app.set("view engine", "pug");
app.set("index", "./views");

//process.env.NODE_ENV;
//set NODE_ENV=production
const nodeEnv = app.get("env")
//set PORT=5000
const port = process.env.PORT || 3000;

console.log("app name ", config.get("name"));
console.log("app mail server", config.get("mail.host"));
//console.log("app mail password", config.get("mail.password"));



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(helmet());
//use course router
app.use("/api/courses", coursesRouter);
app.use("/", homeRouter);
if(nodeEnv === "development"){
    app.use(morgan("tiny"));
    startUpDebugger("app starting")
    console.log("morgan is enable")
}

dbDebugger("Database connecting");

app.use(logger);



app.listen(port, console.log(`listening to port ${port}`))