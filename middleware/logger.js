function log(req, res, next){
    console.log("logging"),
    next()
}

var url = "https://gg";
function logX(message){
    //send http reuqst
    console.log("logx")
}
//export moodule
// module.exports.log = log;
// module.exports.endpoint = url;
module.exports = log;

//loading module
// var logger = require('./logger')
// console.log(logger)