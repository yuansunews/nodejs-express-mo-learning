
const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    //res.send("hello world");
    res.render("index", {titleText: "My express app", appMsg: "Hello world!"})
});

module.exports = router;
