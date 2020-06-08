const http = require("http");

const server = http.createServer((req, res)=>{
    if(req.url == "/"){
        res.write("hello ");
        res.end();
    }
});
server.on("connection", (socket)=>{
    console.log("connection build");
})
server.listen(3000);